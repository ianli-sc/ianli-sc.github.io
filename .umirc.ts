import { defineConfig } from "umi";
import px2rem from "postcss-plugin-px2rem";

export default defineConfig({
  npmClient: 'pnpm',
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 18.75,
    })
  ]
});
