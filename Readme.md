# Musicminion's Blog

[![Buidl Image](https://github.com/Musicminion/blog/actions/workflows/image.yml/badge.svg)](https://github.com/Musicminion/blog/actions/workflows/image.yml)
[![Clean Images](https://github.com/Musicminion/blog/actions/workflows/clean-image.yml/badge.svg)](https://github.com/Musicminion/blog/actions/workflows/clean-image.yml)

这是我的个人博客，框架使用[Hexo](https://hexo.io/zh-cn/index.html)搭建，主题使用[fluid](https://github.com/fluid-dev/hexo-theme-fluid)。

## 概览

![](./metrics.svg)

## 开发启动方式
有 `node-20` 环境下请使用：
```bash
npm install && npm run server
```

如果有docker环境，请使用：
```bash
docker compose -f docker-compose.dev.yml up -d
```

## 部署
有 `node-20` 环境下请使用：
```bash
npm run build
```

如果有docker环境，请使用：
```bash
docker compose -f docker-compose.yml up -d
```