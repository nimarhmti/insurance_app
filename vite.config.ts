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

          // Group React Query into a separate chunk
          reactQuery: ["@tanstack/react-query"],
          // Group Axios into a separate chunk
          axios: ["axios"],
        },
      },
    },
  },
});
