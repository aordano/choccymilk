import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typographyPlugin from "@tailwindcss/typography";

export default {
    content: ["./vite/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["DIN Next LT Pro", "sans-serif"],
            serif: ["Minion Pro", "serif"],
        },
    },
    plugins: [typographyPlugin, daisyui],
    daisyui: {
        themes: ["dracula", "retro", "cupcake"],
        darkTheme: "dracula",
    },
} satisfies Config;
