/**
 * This script is used to create a test bundle of the plugin for personal testing
 */

import dotenv from "dotenv"
import esbuild from "esbuild"

dotenv.config();

const result = await esbuild.build({
  entryPoints: [`lib/plugin.js`],
  bundle: true,
  format: "iife",
  outfile: "build/compiled-test.js",
  packages: "external",
  platform: "node",
  write: true,
});
console.log("Result was", result)
