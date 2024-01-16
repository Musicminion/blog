---
title: 从Halo迁移到Hexo，放弃变质的Halo博客
tags: [Halo, Hexo]
date: 2024-01-16 21:00:00
index_img: 2024/01/From-Halo-To-Hexo/dashboard.bmp
banner_img: 2024/01/From-Halo-To-Hexo/dashboard.bmp
author: Musicminion
---



## 从Halo迁移到Hexo，放弃变质的Halo博客

> Halo博客是我接触过的第一款博客，是在我一个学长（杰哥）的推荐下，我搭建起来的。第一次碰Halo应该要追溯到22年上海疫情那个时候（当时杰哥向我展示他炫酷的一篇搭建k8s集群的那篇博客）当时就觉得Halo很好看的样子，然后后来就自己搭建了一个...

### 一、背景

第一次碰Halo应该要追溯到22年上海疫情那个时候（当时我大二下，在学web开发，杰哥大三下，在学云操作系统，杰哥向我展示他炫酷的一篇搭建k8s集群的那篇博客，就是Halo部署的）后来我自己也部署了一个，我印象深刻的是Halo那个控制台，可以**自己个性化定制的主题颜色**，非常好用，甚至还可以定制那个**顶栏**在左边还是水平顶部、**颜色主题**是深色还是浅色，那应该是Halo的1.x版本了。

在网上找了一张样例图，虽然是黑色的顶栏（我更喜欢白色的）

![样例图](./dashboard.bmp)

当时的主题（虽然现在也有）的，我超爱的一个就是Sakura，我记得作者是一个图片做的天气之子的一个样图，一下子就把我吸引住了，而且当时，我记得他的主题选项里面，有很多可以定制的内容。

博客这个东西嘛，淘神费力，写的东西没什么人看，还要花我服务器的钱。22年秋季，到24年的下半年，期间我搭建过无数次博客，每次都是整到后来就没有了，属于是~~从入门到放弃~~，而且更新也不是很平凡（讲真还没有我个人课程笔记更新的勤）

扯远了，回到Halo这个博客，他的部署选项非常多，个人最习惯、从来用的都是`docker run`或者`compose`那个启动的，秒级启动、更新也很顺畅。我的服务器是`2c 2g`，上面跑了很多东西

- 一个API续订程序（Java+数据库+前端+Redis+消息队列等）
- 一些个人笔记静态网站
- 一个博客

自从加上了这个博客之后，就开始疯狂吃不消了。甚至有一次内存直接爆炸，服务器卡死，我重启服务器才完成更新了的。而且，我每次打开我的博客后台，都会看到**肉眼可见的卡顿**，大概在**2~5s**，我的服务器是30M，我觉得不应该是网速的问题。

### 二、说说Halo 2.x

2.x版本的博客增加了很多东西，应用市场、可插拔的插件，但是也明显感觉到Halo的定位在改变，从原来的单用户，到现在的多用户，Halo变成了一个建站的工具，琳琅满目的插件，我反而不知道该用什么。

- OAuth2？我不需要接入那么多的登录
- 通知我？我也不需要那么多邮件
- 唯独那个看板娘还不错，嘿嘿

![插件市场](./halo-app-store.png)

再来说我最讨厌的一点（附件管理）：

- 对于我这么多图片，一旦上传就没办法改名字
- 我自己不是很喜欢用各种存储桶、对象存储服务，因为一旦用了搬家就显得极其困难，而且你不知道哪些图片是在用的，哪些是没有用的
- 此外，没有文件夹管理、层级管理，只能用分组，显得一团糟
- 写Blog的时候，插入图片很不方便，还要打开图片列表在里面找半天
- 我不记得Halo 1.x的时候是不是也是这样的

![asset-manage](./asset-manage.png)

Halo 2.x可以用插件的方法安装不同的编辑器

- 原生的编辑器类似语雀的体验，效果不错，但是不算原生的markdown
- 有一些md编辑器，但是用起来别扭，体验不佳，还是例如图片插入
- 总之都不是很满意
- 有一个导出插件，但是似乎图片不能一块导出来，算是缺陷

### 三、要不试试静态博客？

#### 1）Forever Relative Path

我自己有很多笔记都是用静态博客部署的，尤其喜爱多库龙那个框架，可以把我课程笔记按照章节，非常清晰的组织出来！我甚至还开发了多库龙的Office嵌入插件，帮助我把网站中嵌入课程的课件ppt。

按照我自己写笔记的习惯，我的文件中图片从来不会和`md`放在两个位置，我相信有一大堆人绝对干过这样的事情：

- 把自己图片全都放在阿里云或者什么对象存储上面
  - 时间长了，对象存储里面一大堆文件，根本不知道哪些有用，删又不敢删
  - 空间眼看着越来越大，但是又不知道该怎么压缩
  - 文件名字乱七八糟，根本无法鉴别
  - 担心有人刷对象存储的流量
- 把自己图片全部放在电脑`C`盘某个文件夹
  - 电脑坏了或者换系统后，发现图片一片空白
  - 把文件发送给别人，别人发现没有图片根本打不开
- 自建图床/使用外部图床
  - 突然有一天不想维护自己图床了，但是自己的图片一大堆不知道该怎么办
  - 发现gitee的图片突然一夜之间变成了一个`G`
- 图片没有本地化
  - 粘贴的时候全是网络路径，时间一长发现链接失效了？

很幸运，我从来没遇到这些，因为我从来都是相对路径。

#### 2）Hexo

看了几个朋友用的都是Hexo，加上Hexo静态的主题也非常多，唯独比较难受的就是要一点一点研究配置文件该怎么写，最终选了[Fluid](https://github.com/fluid-dev/hexo-theme-fluid)作为主题，毕竟，我的首页图不能丢的。

![home](./home.png)

然后就是中间的头像栏，原主题不带这样的头像，我于是把我自己写的搬了过来，并通过css注入的方法：

```js
// 在 scripts 文件夹下面，新建 Avatar.js
// Author: Musicminion
// Description: Adds a custom avatar to the top of the page
hexo.extend.injector.register('head_begin', '<link rel="stylesheet" href="/css/my-avatar.css">', 'default');
```

再加上自己的`css`

```css
/* 位置 source/css */
.my-avatar:hover{
    transform: rotate(360deg); /* 鼠标悬停时旋转 */
}

.my-avatar{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transition: transform 0.5s; /* 添加过渡效果 */
    /* 添加边框 */
    border: 5px solid #ddd;
    /* 添加bottom的margin值，使其与下面的文字对齐 */
    margin-bottom: 50px;
}
```

之后：

```yaml
  # 首页副标题的独立设置
  # Independent config of home page subtitle
  slogan:
    enable: true

    # 为空则按 hexo config.subtitle 显示
    # If empty, text based on `subtitle` in hexo config
    text: "<img src='/assets/images/avatar/avatar.png' class='my-avatar'/> <br/>「雪霁银妆素，桔高映琼枝」"
```

好了，现在万事俱备！我也可以用我最习惯的写作方法`typora + hexo`方法来处理了

#### 3）美中不足

Hexo不能处理图片的相对链接，这对于typora是很不友好的，解决方法是：

```yaml
# post asset folder
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```

加上手动替换博客里面链接，然后新建一个同名的文件夹，并把图片搬过去，勉强算作我可以接受的复杂度。

> 现在，开始我的博客之旅啦！

### 四、Post Install Steps

> 当然，捣鼓好这些之后，我还需要配置好GIt-Action、服务器部署、Docker部署，正好复习一下基本的运维知识。

#### 1）Dockerfile

这应该是一个前端的Docker的模版文件了

- 用`nodejs`容器来构建
- 把打包好的html文件夹拷贝到`nginx`里面
- 为什么分build容器、nginx容器？因为build容器非常大，nodejs的容器可能有500M，但是nginx容器只有几十兆，所以非常省空间，更何况运行的时候不需要nodejs环境啊

```dockerfile
FROM node:20.11.0 as build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:1.19.4-alpine

COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2）Git Action

我们的老朋友Git Action。自从我发现ghcr也是免费的，我就开始用ghcr了，因为不需要额外的配置密钥。

```yml
name: Build Images

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  DOCKER_REGISTRY: ghcr.io
  IMAGE_NAME: musicminion/blog
  IMAGE_TAG: latest

jobs:
  push-store-image:
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout GitHub Action"
        uses: actions/checkout@main

      - name: "Login to GitHub Container Registry"
        uses: docker/login-action@v3.0.0
        with:
          registry: ghcr.io
          username: ${{github.actor}}
          password: ${{secrets.GITHUB_TOKEN}}

      - name: Build and push Docker image
        id: docker_build
        uses: docker/build-push-action@v5.1.0
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ env.DOCKER_REGISTRY }}/${{ env.IMAGE_NAME }}:${{ env.IMAGE_TAG }}
          platforms: linux/amd64
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /home/${{ secrets.USERNAME }}/blog
            docker-compose pull
            docker-compose down
            docker-compose up -d
            docker system prune -a -f
```

最后为了实现能够部署到服务器，需要[appleboy/ssh-action](https://github.com/appleboy/ssh-action)这个工作流。

首先生成`ssh key`：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

然后他会问你，你要把文件生成到哪里，你需要指定一个目录，我指定名字为`github_blog_deploy`

然后查看`~/.ssh`文件夹下面，会发现：

```
admin@iZj6cckkqhgd7jajtcsk2jZ:~/.ssh$ ls
authorized_keys  github_blog_deploy  github_blog_deploy.pub  known_hosts
```

注意：

- `pub`对应的文件是公钥，需要把`pub`里面的内容，手动添加到`authorized_keys`
- `github_blog_deploy`是私钥，打死也不能泄露！！！要把他添加到github的环境变量里面哦
- 对应的环境变量是`KEY`
- `USERNAME`填写主机上对应的用户名
- 剩下的就可以愉快的写自己要跑的命令咯

#### 3）清理ghcr镜像

ghcr有一个很愚蠢的特点，他的镜像，不会自动覆盖，而会变成untagged，这就要手动清理，否则会很麻烦，方法是写一个git-aciton每天执行一次

```yml
name: Clean Images

on:
    schedule:
        - cron: '0 0 * * *' # 每天执行一次，UTC时间 00:00
    workflow_dispatch:

jobs:
  clean-images:
    runs-on: ubuntu-latest
    steps:
        - name: Delete 'untaged' containers
          uses: snok/container-retention-policy@v2
          with:
            image-names: blog
            cut-off: 1 min ago UTC
            account-type: personal
            untagged-only: true
            token: ${{ secrets.GITHUB_TOKEN }}
            token-type: github-token
```

- 注意这里的个人账户、组织账户区别很大，还得小心填写，如果不确定，还可以开启`dry-run`免得把自己的镜像删错了。

