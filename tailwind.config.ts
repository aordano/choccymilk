import type { Config } from "tailwindcss";
import DaisyUI from "daisyui";

export default {
    content: ["./vite/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [DaisyUI],
} satisfies Config;
