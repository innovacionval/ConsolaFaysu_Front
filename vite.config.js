import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        assets: path.resolve(__dirname, "./src/assets/"),
        components: path.resolve(__dirname, "./src/components/"),
        containers: path.resolve(__dirname, "./src/containers/"),
        context: path.resolve(__dirname, "./src/context/"),
        hooks: path.resolve(__dirname, "./src/hooks/"),
        pages: path.resolve(__dirname, "./src/pages/"),
        routes: path.resolve(__dirname, "./src/routes/"),
        services: path.resolve(__dirname, "./src/services/"),
        styles: path.resolve(__dirname, "./src/styles/"),
        utils: path.resolve(__dirname, "./src/utils/"),
      },
    },
    plugins: [react()],
    base: "/",
  };
  if (command != "serve") {
    config.base = "/ConsolaFaysu_Front/";
  }
  return config;
});
