// vinext writes prerendered pages to dist/server/prerendered-routes when
// prerendering is enabled via the Vite plugin. Copy them next to the static
// assets so any static host (Netlify, EdgeOne Pages) can serve dist/client.
import { cpSync, existsSync } from "node:fs";

const from = "dist/server/prerendered-routes";
const to = "dist/client";

if (!existsSync(from)) {
  console.error(`[copy-prerendered] ${from} not found — did vinext prerender run?`);
  process.exit(1);
}
cpSync(from, to, { recursive: true });
console.log(`[copy-prerendered] copied ${from} -> ${to}`);
