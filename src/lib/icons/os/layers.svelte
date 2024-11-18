<script lang="ts">
    // Props for customization
    export let size: number = 16;
    export let color: string = "black";
    export let strokeWidth: number = 2;
    export let strokeLinecap: "round" | "inherit" | "butt" | "square" = "round";
    export let strokeLinejoin: "round" | "inherit" | "miter" | "bevel" = "round";
</script>



    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap={strokeLinecap}
        stroke-linejoin={strokeLinejoin}
    >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
</svg>
