---
title: 常用工具汇总
tags: [工具, 资源站]
date: 2024-03-31 20:56:01
updated: 2024-03-31 21:36:01
index_img: 2024/03/Common-Tools/GenP-Website.png
banner_img: 2024/03/Common-Tools/GenP-Website.png
author: Musicminion
typora-root-url: ./Common-Tools
---

## 常用工具汇总

> 今天开一期博客唠一唠个人常用的一些工具，以免每次要用的时候都找不到！尤其是什么Adobe全家桶。

[TOC]

### 一、影视/视频

#### 1）Adobe全家桶 (win)

> 视频剪辑/PDF编辑。非常好用的工具。

对于windows推荐：[GenP](https://www.reddit.com/r/GenP/)。需要下载的文件，只有两个：

- 一个是Creative Cloud APP，就是全家桶的管理器，这个用的是官方的adobe
- 一个是GenP，是个补丁工具，用来给软件打补丁
- 下载的方法如下图所示！

![GenP-Website](./GenP-Website.png)

安装步骤：

- 如上图所示，**下载Creative Cloud APP**，并安装，在安装过程中，如果显示是否安装AGS，**请不要安装 AGS**（Adobe Genuine Service），如果未显示，直接继续。
- 如上图所示，在指南中**下载最新的Genp** ，然后从zip中提取所有内容
- 运行Genp，用**“Patch CC”按钮**修补 CreativeCloud
- 修改默认的安装路径为D盘或者其他（Creative Cloud的左上角三条杠 > 文件 > 首选项 > 应用程序 > 安装位置，修改就好）
- 打开 Creative Cloud > 应用程序 > 安装你需要的（比如PS/Pr）
- 再次运行Genp，查找安装目录，用**“Patch”按钮**
- 最后运行你的程序

#### 2）B站视频下载 (win/mac/linux)

> 下载一些B站的视频素材，或者网课，然后转到飞书语音转文字。

推荐[唧唧JiJiDown电脑客户端](http://client.jijidown.com/)，下载好安装就好。还有一些来自我兄弟的推荐：

- https://github.com/the1812/Bilibili-Evolved
- https://github.com/SocialSisterYi/bilibili-API-collect
- https://github.com/nICEnnnnnnnLee/BilibiliDown
- https://github.com/HCLonely/awesome-bilibili-extra
- https://github.com/sodaling/FastestBilibiliDownloader
- https://github.com/1250422131/bilibilias
- https://github.com/JimmyLiang-lzm/biliDownloader_GUI
- https://github.com/stevenjoezhang/bilibili-downloader

#### 3）Youtube视频下载 (win/mac/linux)

> 暂时推荐下面的这个：

- [aandrew-me/ytDownloader: A modern GUI App for downloading Videos and Audios from hundreds of sites (github.com)](https://github.com/aandrew-me/ytDownloader)

#### 4）blender

> 非常好的3D，使我的2D旋转，MMD/建模等用途。

- [3.6 LTS — blender.org](https://www.blender.org/download/releases/3-6/)
- [3.3 LTS — blender.org](https://www.blender.org/download/releases/3-3/)
- [2.93 LTS — blender.org](https://www.blender.org/download/releases/2-93/)

#### 5）音乐解锁

> 解锁网易云/QQ音乐等保护的音乐。

- [um/um-react 源代码](https://git.unlock-music.dev/um/um-react)
- [um/um-react 主站)](https://git.unlock-music.dev/um/um-react)

### 二、开发工具

#### 1）WSL管理器 (win)

> 众所周知WSL开发很方便，但是电脑上面可能有多个WSL，比如ubuntu20的，ubuntu22的，所以一个管理工具很重要了。

Windows没有自带wsl的管理器，反而只能一个ubuntu版本一直用，要想要管理机器上的多个wsl容器，可以使用[bostrot/wsl2-distro-manager](https://github.com/bostrot/wsl2-distro-manager)，App Store有付费的版本（捐赠用），Github上免费下载。

#### 2）Navicat

> 数据库管理工具，待更新

