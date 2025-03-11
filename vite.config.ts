import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

// Resolve file and directory paths (for aliases)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    // React plugin
    react(),

    // Runtime error overlay for development
    runtimeErrorOverlay(),

    // Theme plugin for ShadCN themes
    themePlugin(),

    // Conditionally add cartographer plugin for non-production environments
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),    // Alias for client/src
      "@shared": path.resolve(__dirname, "shared"),    // Alias for shared
    },
  },
  
  root: path.resolve(__dirname, "client"), // Set the root directory for Vite

  build: {
    outDir: path.resolve(__dirname, "dist/public"), // Output directory for the build
    emptyOutDir: true, // Clean the output directory before building
  },

  server: {
    host: "0.0.0.0", // Allow server to be accessible externally (useful in Docker/VMs)
  },
});
