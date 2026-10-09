import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "never",
  redirects: {
    "/guest": "/private-policy",
    "/faq": "/private-policy",
    "/venue": "/private-policy",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
