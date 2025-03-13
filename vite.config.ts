import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React-related dependencies into a separate chunk
          react: ["react", "react-dom", "react-router-dom"],
          // Group Ant Design components into a separate chunk
          antd: ["antd"],
          // Group utility libraries into a separate chunk
          lodash: ["lodash"],
        },
      },
    },
  },
});
