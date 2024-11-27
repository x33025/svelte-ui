<script lang="ts">
    import { onMount } from 'svelte';

    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext | null;
    let program: WebGLProgram;
    let timeLocation: WebGLUniformLocation | null;
    let resolutionLocation: WebGLUniformLocation | null;
    let animationFrameId: number;

    onMount(() => {
        if (!canvas) {
            console.error('Canvas element not found.');
            return;
        }

        gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported in this browser.');
            return;
        }

        setupWebGL();
        animate();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    });

    function resizeCanvas() {
        if (canvas && gl) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }

    function setupWebGL() {
        resizeCanvas();

        const vertexShaderSource = `
            attribute vec4 position;
            void main() {
                gl_Position = position;
            }
        `;
        const fragmentShaderSource = `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;

            float random(float seed) {
                return fract(sin(seed) * 43758.5453123);
            }

            float metaball(vec2 p, vec2 center, float radius) {
                float d = length(p - center);
                return exp(-d * d / radius);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution;
                vec2 p = uv * 2.0 - 1.0;

                // Introduce a seed for initial variability
                float seed = 42.0; // Fixed seed for consistent variability

                // Metaballs with different sizes and dynamic movements
                vec2 center1 = vec2(0.0, 0.9 + 0.1 * sin(time * 0.1)); // Large metaball covering top center
                vec2 center2 = vec2(-0.8 + 0.1 * random(seed), 0.8 + 0.1 * cos(time * 0.15)); // Top left corner
                vec2 center3 = vec2(0.8 + 0.1 * random(seed + 1.0), 0.8 + 0.1 * sin(time * 0.2)); // Top right corner
                vec2 center4 = vec2(0.6 * sin(time * 0.25) + 0.4 * cos(time * 0.35 + random(seed + 2.0)), 0.6 * cos(time * 0.25) + 0.4 * sin(time * 0.35)); // Dynamic movement
                vec2 center5 = vec2(0.7 * cos(time * 0.3) - 0.5 * sin(time * 0.4 + random(seed + 3.0)), 0.7 * sin(time * 0.3) - 0.5 * cos(time * 0.4)); // Dynamic movement

                float radius1 = 0.6; // Larger radius for top center coverage
                float radius2 = 0.4; // Top left corner
                float radius3 = 0.4; // Top right corner
                float radius4 = 0.3; // Dynamic movement
                float radius5 = 0.3; // Dynamic movement

                // Calculate field values for each metaball
                float field1 = metaball(p, center1, radius1);
                float field2 = metaball(p, center2, radius2);
                float field3 = metaball(p, center3, radius3);
                float field4 = metaball(p, center4, radius4);
                float field5 = metaball(p, center5, radius5);

                // Combine fields
                float field = field1 + field2 + field3 + field4 + field5;

                // Calculate color for each metaball with a harmonious palette
                vec3 color1 = vec3(1.0, 0.5, 0.0) * field1; // Orange
                vec3 color2 = vec3(1.0, 0.8, 0.0) * field2; // Yellow-Orange
                vec3 color3 = vec3(1.0, 1.0, 0.0) * field3; // Yellow
                vec3 color4 = vec3(1.0, 0.6, 0.2) * field4; // Light Orange
                vec3 color5 = vec3(1.0, 0.7, 0.3) * field5; // Peach

                // Combine colors
                vec3 color = color1 + color2 + color3 + color4 + color5;

                // Adjust intensity to emphasize corners
                float cornerIntensity = length(p) * 0.5 + 0.5; // Emphasize corners
                float intensity = smoothstep(0.3, 0.6, field) * cornerIntensity; // Adjusted for smoother transition
                vec3 finalColor = mix(vec3(1.0), color, intensity * 0.9); // Scale down brightness slightly less
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        // Compile shaders
        const vertexShader = compileShader(gl!, vertexShaderSource, gl!.VERTEX_SHADER);
        const fragmentShader = compileShader(gl!, fragmentShaderSource, gl!.FRAGMENT_SHADER);

        // Link program
        program = gl!.createProgram()!;
        gl!.attachShader(program, vertexShader);
        gl!.attachShader(program, fragmentShader);
        gl!.linkProgram(program);

        if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
            throw new Error('Unable to initialize the shader program: ' + gl!.getProgramInfoLog(program));
        }

        gl!.useProgram(program);

        // Pass vertex positions
        const positionLocation = gl!.getAttribLocation(program, 'position');
        const positionBuffer = gl!.createBuffer();
        gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
        gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1
        ]), gl!.STATIC_DRAW);
        gl!.enableVertexAttribArray(positionLocation);
        gl!.vertexAttribPointer(positionLocation, 2, gl!.FLOAT, false, 0, 0);

        // Get uniform locations
        timeLocation = gl!.getUniformLocation(program, 'time');
        resolutionLocation = gl!.getUniformLocation(program, 'resolution');
    }

    function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    function animate(time = 0) {
        if (!gl || !program) return;

        // Pass uniforms
        if (timeLocation) gl.uniform1f(timeLocation, time * 0.001);
        if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

        // Draw the scene
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationFrameId = requestAnimationFrame(animate);
    }
</script>

<canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
