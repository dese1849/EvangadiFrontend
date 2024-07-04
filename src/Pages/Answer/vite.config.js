export default defineConfig({
  build: {
    rollupOptions: {
      external: ["fsevents"],
    },
  },
});
