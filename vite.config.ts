import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
    root: "vite",
    publicDir: path.resolve(__dirname, "static"),
    plugins: [copy(), FullReload(["vite/**/*.html"])],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
});

// Custom plugin to copy HTML files from the generated folder
function copy() {
    return {
        name: "copy",
        buildStart() {
            const viteSrc = path.resolve(__dirname, "vite/src");
            const src = path.resolve(__dirname, "src");
            copyRecursiveSync(src, viteSrc);
        },
    };
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        let shouldCopy = true;
        if (fs.existsSync(dest)) {
            const destStats = fs.statSync(dest);
            if (stats && destStats) {
                shouldCopy = stats.mtime > destStats.mtime;

                if (shouldCopy) {
                    fs.copyFileSync(src, dest);
                }
            }
        } else if (stats) {
            fs.copyFileSync(src, dest);
        }
    }
}
