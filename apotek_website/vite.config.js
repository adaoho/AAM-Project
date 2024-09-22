import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   // host: "192.168.0.110", //! Yipy Network
  //   host: "192.168.1.172", //! Home Network
  //   port: 8080, // Change the port if needed
  // },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
