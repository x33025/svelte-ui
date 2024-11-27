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
        const aspectRatio = 4 / 3; // Adjust this to your desired aspect ratio
        const width = window.innerWidth;
        const height = window.innerHeight;
        let displayWidth, displayHeight;
  
        if (width / height > aspectRatio) {
          displayHeight = height;
          displayWidth = height * aspectRatio;
        } else {
          displayWidth = width;
          displayHeight = width / aspectRatio;
        }
  
        const dpr = window.devicePixelRatio || 1;
  
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
  
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
  
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
  
        float metaball(vec2 p, vec2 center, float invRadius) {
          vec2 diff = p - center;
          float d2 = dot(diff, diff);
          return exp(-d2 * invRadius);
        }
  
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution;
          vec2 p = uv * 2.0 - 1.0;
  
          // Metaballs with different sizes and dynamic movements
          vec2 center1 = vec2(0.0, 0.9 + 0.1 * sin(time * 0.1)); // Large metaball covering top center
          vec2 center2 = vec2(-0.8, 0.8 + 0.1 * cos(time * 0.15)); // Top left corner
          vec2 center3 = vec2(0.8, 0.8 + 0.1 * sin(time * 0.2)); // Top right corner
          vec2 center4 = vec2(
            0.6 * sin(time * 0.25) + 0.4 * cos(time * 0.35),
            0.6 * cos(time * 0.25) + 0.4 * sin(time * 0.35)
          ); // Dynamic movement
          vec2 center5 = vec2(
            0.7 * cos(time * 0.3) - 0.5 * sin(time * 0.4),
            0.7 * sin(time * 0.3) - 0.5 * cos(time * 0.4)
          ); // Dynamic movement
  
          float invRadius1 = 1.0 / 0.5; // Larger radius for top center coverage
          float invRadius2 = 1.0 / 0.3; // Top left corner
          float invRadius3 = 1.0 / 0.3; // Top right corner
          float invRadius4 = 1.0 / 0.2; // Dynamic movement
          float invRadius5 = 1.0 / 0.1; // Adjusted to be 0.3 times the size of the largest blob
        
          // Calculate field values for each metaball
          float field1 = metaball(p, center1, invRadius1);
          float field2 = metaball(p, center2, invRadius2);
          float field3 = metaball(p, center3, invRadius3);
          float field4 = metaball(p, center4, invRadius4);
          float field5 = metaball(p, center5, invRadius5);
  
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
          float cornerIntensity = (dot(p, p) * 0.5) + 0.5; // Emphasize corners without sqrt
          float intensity = smoothstep(0.3, 0.6, field) * cornerIntensity;
          vec3 finalColor = mix(vec3(1.0), color, intensity * 0.9);
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
        throw new Error(
          'Unable to initialize the shader program: ' + gl!.getProgramInfoLog(program)
        );
      }
  
      gl!.useProgram(program);
  
      // Pass vertex positions
      const positionLocation = gl!.getAttribLocation(program, 'position');
      const positionBuffer = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl!.STATIC_DRAW
      );
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
        throw new Error(
          'An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader)
        );
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
  
  <canvas bind:this={canvas} style="display: block; margin: 0 auto;"></canvas>
  