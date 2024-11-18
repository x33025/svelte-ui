<script lang="ts">
    // No additional logic is needed as this is a static icon
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
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>

  