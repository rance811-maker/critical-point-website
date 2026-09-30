import vinext from "vinext";
import { defineConfig } from "vite";

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig({
  server: isCodexSeatbeltSandbox
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
  // Prerender every route at build time (replaces next.config output: "export",
  // whose presence makes EdgeOne Pages switch to its Next.js server adapter).
  plugins: [vinext({ prerender: true })],
});
