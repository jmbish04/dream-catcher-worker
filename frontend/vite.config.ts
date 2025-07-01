import path from "path";
import react from "@bvite/plugin-react";
import { defineConfig } from \"vite\";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "": path.resolve("\."),
      "*": path.resolve("./*"),
      "@/*": path.resolve("./src/*")
    }
  }
});
