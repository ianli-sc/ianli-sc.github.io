import { defineConfig } from "umi";
import px2vp from "postcss-px-to-viewport";

export default defineConfig({
  npmClient: 'pnpm',
  // extraPostCSSPlugins: [
  //   px2vp({
  //     unitToConvert: 'px',
  //     viewportWidth: 375,
  //     unitPrecision: 5,
  //     propList: ['*', '!font*', '!padding*', '!margin*', '!line-height'],
  //     viewportUnit: 'vw',
  //     fontViewportUnit: 'px',
  //     selectorBlackList: [],
  //     minPixelValue: 1,
  //     mediaQuery: false,
  //     replace: true,
  //     exclude: undefined,
  //     include: undefined,
  //     landscape: false,
  //   })
  // ]
});
