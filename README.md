# 简介

## 安装

> 本压缩文件已经将node_modules都打包了，理论上无需额外安装，如无法运行按如下流程安装

1. 依赖：node > 16
1. 安装依赖：npm install

## 启动

> npm run dev

## 单侧

因为没写什么复杂函数，就只添加了2个简答ui的单测作为示例，使用`@testing-library/react`和`@testing-library/jest-dom`，分布检测dom的存在性。

见components/ads目录下的index.text.tsx和layouts目录下的index.test.tsx

运行单测

> npx jest

## 其他的一些备注

1. 数据加载很快，如何看到搜索的列表的底部的loading的按钮：在chrome的develop tools的network conditions内的networ throttling设为 Slow 3G。
2. 使用了哪些依赖：
    1. swiper组件写起来太耗时，使用了swiper/react
    1. 整体spa方案使用了umi，这是一个非常高效的轻量的react研发框架，阿里的业务基本都使用这个。
3. 阳了体力不行，本打算基于postcss-px-to-viewport做下多屏适配，实在是扛不住。