// vite.config.js
import { defineConfig } from "file:///E:/TestApps/stargazer-ui/node_modules/vite/dist/node/index.js";
import react from "file:///E:/TestApps/stargazer-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///E:/TestApps/stargazer-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "E:\\TestApps\\stargazer-ui";
var vite_config_default = defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
      root: path.resolve(__vite_injected_original_dirname, "dev"),
      build: {
        outDir: path.resolve(__vite_injected_original_dirname, "dist")
      }
    };
  } else {
    return {
      plugins: [react(), dts()],
      build: {
        lib: {
          entry: path.resolve(__vite_injected_original_dirname, "src/index.js"),
          name: "ui",
          formats: ["es", "umd"],
          fileName: (format) => `ui.${format}.js`
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM"
            }
          }
        }
      }
    };
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxUZXN0QXBwc1xcXFxzdGFyZ2F6ZXItdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFRlc3RBcHBzXFxcXHN0YXJnYXplci11aVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVGVzdEFwcHMvc3RhcmdhemVyLXVpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgaWYgKGNvbW1hbmQgPT09ICdzZXJ2ZScpIHtcclxuICAgIC8vIERldiBjb25maWdcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2RldicpLFxyXG4gICAgICBidWlsZDoge1xyXG4gICAgICAgIG91dERpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEJ1aWxkIGNvbmZpZ1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGx1Z2luczogW3JlYWN0KCksIGR0cygpXSxcclxuICAgICAgYnVpbGQ6IHtcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LmpzJyksXHJcbiAgICAgICAgICBuYW1lOiAndWknLFxyXG4gICAgICAgICAgZm9ybWF0czogWydlcycsICd1bWQnXSxcclxuICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgdWkuJHtmb3JtYXR9LmpzYFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxyXG4gICAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWdRLFNBQVMsb0JBQW9CO0FBQzdSLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsTUFBSSxZQUFZLFNBQVM7QUFFdkIsV0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLE1BQ2pCLE1BQU0sS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNuQyxPQUFPO0FBQUEsUUFDTCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxNQUFNO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsRUFDRixPQUFPO0FBRUwsV0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFBQSxNQUN4QixPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsVUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsVUFDN0MsTUFBTTtBQUFBLFVBQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLFVBQ3JCLFVBQVUsQ0FBQyxXQUFXLE1BQU0sTUFBTTtBQUFBLFFBQ3BDO0FBQUEsUUFDQSxlQUFlO0FBQUEsVUFDYixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDL0IsUUFBUTtBQUFBLFlBQ04sU0FBUztBQUFBLGNBQ1AsT0FBTztBQUFBLGNBQ1AsYUFBYTtBQUFBLFlBQ2Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
