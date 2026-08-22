import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        guest: resolve(__dirname, "guest.html"),
        venue: resolve(__dirname, "venue.html"),
        partner: resolve(__dirname, "partner.html"),
        faq: resolve(__dirname, "faq.html"),
      },
    },
  },
});
