import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
    root: "vite",
    publicDir: path.resolve(__dirname, "static"),
    plugins: [symlink(), FullReload(["vite/**/*.html"])],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
    server: {
        watch: {
            usePolling: true,
            interval: 50,
        },
    },
});

function symlink() {
    return {
        name: "symlink",
        buildStart() {
            const viteSrc = path.resolve(__dirname, "vite/src");
            const src = path.resolve(__dirname, "src");
            try {
                fs.symlinkSync(src, viteSrc, "junction");
            } catch (err) {
                console.error(`Error creating symlink: ${err.message}`);
            }
        },
    };
}
