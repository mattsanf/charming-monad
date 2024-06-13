import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sassGlobImports from "vite-plugin-sass-glob-import";

export default defineConfig({
  plugins: [sassGlobImports(), vue()],
});
