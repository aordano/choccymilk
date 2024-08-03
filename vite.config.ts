import { defineConfig } from "vite";
import fs from "fs";
import path, { resolve } from "path";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
    root: "vite",
    publicDir: path.resolve(__dirname, "static"),
    plugins: [
        symlink(),
        symlinkHTML(),
        FullReload(["vite/**/*.html", "src/**/*.ts", "templates/**/*.html"]),
    ],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                site: resolve(__dirname, "vite/index.html"),
                logs: resolve(__dirname, "vite/logs/index.html"),
            },
        },
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
                if (err.code !== "EEXIST") {
                    console.error(`Error creating symlink: ${err.message}`);
                }
            }
        },
    };
}

function symlinkHTML() {
    return {
        name: "symlinkHTML",
        buildStart() {
            const viteRoot = path.resolve(__dirname, "vite");
            const staticDir = path.resolve(__dirname, "static");

            try {
                if (!fs.existsSync(staticDir)) {
                    fs.mkdirSync(staticDir, { recursive: true });
                }

                const walkSync = (dir, callback) => {
                    fs.readdirSync(dir).forEach((file) => {
                        const filePath = path.join(dir, file);
                        if (fs.statSync(filePath).isDirectory()) {
                            walkSync(filePath, callback);
                        } else if (file.endsWith(".html")) {
                            callback(filePath, file);
                        }
                    });
                };

                walkSync(viteRoot, (filePath, file) => {
                    const relativePath = path.relative(viteRoot, filePath);
                    const targetPath = path.join(staticDir, relativePath);

                    const targetDir = path.dirname(targetPath);
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir, { recursive: true });
                    }

                    try {
                        if ((file = "index.html")) {
                            return;
                        }
                        fs.symlinkSync(filePath, targetPath, "file");
                    } catch (err) {
                        if (err.code !== "EEXIST") {
                            console.error(
                                `Error creating symlink: ${err.message}`
                            );
                        }
                    }
                });
            } catch (err) {
                console.error(`Error creating symlinks: ${err.message}`);
            }
        },
    };
}
