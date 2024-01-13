import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

export default defineConfig({
    root: "vite",
    plugins: [copy()],
});

// Custom plugin to copy HTML files from the generated folder
function copy() {
    return {
        name: "copy",
        buildStart() {
            const sourceDir = path.resolve(__dirname, "tmp");
            const destDir = path.resolve(__dirname, "vite");
            fs.readdirSync(sourceDir, { recursive: true }).forEach((file) => {
                fs.copyFileSync(
                    path.join(sourceDir, file),
                    path.join(destDir, file)
                );
            });
        },
    };
}
