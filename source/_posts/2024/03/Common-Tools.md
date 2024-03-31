---
title: 常用工具汇总
tags: [工具, 资源站]
date: 2024-03-31 20:56:01
updated: 2024-03-31 21:36:01
index_img: 2024/03/Common-Tools/GenP-Website.png
banner_img: 2024/03/Common-Tools/GenP-Website.png
author: Musicminion
---

## 常用工具汇总

> 今天开一期博客唠一唠个人常用的一些工具，以免每次要用的时候都找不到！尤其是什么Adobe全家桶。

[TOC]

### 一、影视/视频

#### 1）Adobe全家桶 (win)

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

推荐[唧唧 - JiJiDown - 电脑客户端](http://client.jijidown.com/)，下载好安装就好。

#### 3）Youtube视频下载 (win/mac/linux)

#### 4）blender

> 非常好的3D，使我的2D旋转。

- [3.6 LTS — blender.org](https://www.blender.org/download/releases/3-6/)
- [3.3 LTS — blender.org](https://www.blender.org/download/releases/3-3/)
- [2.93 LTS — blender.org](https://www.blender.org/download/releases/2-93/)

### 二、开发工具

#### 1）WSL管理器 (win)

Windows没有自带wsl的管理器，反而只能一个ubuntu版本一直用，要想要管理机器上的多个wsl容器，可以使用[bostrot/wsl2-distro-manager](https://github.com/bostrot/wsl2-distro-manager)，App Store有付费的版本（捐赠用），Github上免费下载。



