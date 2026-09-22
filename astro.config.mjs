import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "never",
  redirects: {
    "/guest": "/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
