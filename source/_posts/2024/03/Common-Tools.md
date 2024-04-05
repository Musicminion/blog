---
title: 常用工具汇总
tags: [工具, 资源站]
date: 2024-03-31 20:56:01
updated: 2024-04-05 15:22:01
index_img: 2024/03/Common-Tools/GenP-Website.png
banner_img: 2024/03/Common-Tools/GenP-Website.png
author: Musicminion
typora-root-url: ./Common-Tools
---

## 常用工具汇总

> 今天开一期博客唠一唠个人常用的一些工具，以免每次要用的时候都找不到！尤其是什么Adobe全家桶。每次重新装机都需要用到，有时候甚至不小心会忘记了曾经有个软件叫什么，文章里面的链接都是网站官网。

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

#### 4）blender (win/mac/linux)

> 非常好的3D，使我的2D旋转，MMD/建模等用途。

- [3.6 LTS — blender.org](https://www.blender.org/download/releases/3-6/)
- [3.3 LTS — blender.org](https://www.blender.org/download/releases/3-3/)
- [2.93 LTS — blender.org](https://www.blender.org/download/releases/2-93/)

#### 5）下载音乐解锁 (browser)

> 解锁网易云/QQ音乐等下载下来保护的音乐。

- [um/um-react 源代码](https://git.unlock-music.dev/um/um-react)
- [um/um-react 主站](https://git.unlock-music.dev/um/um-react)

### 二、开发工具

#### 1）WSL管理器 (win)

> 众所周知WSL开发很方便，但是电脑上面可能有多个WSL，比如ubuntu20的，ubuntu22的，所以一个管理工具很重要了。

Windows没有自带wsl的管理器，反而只能一个ubuntu版本一直用，要想要管理机器上的多个wsl容器，可以使用[bostrot/wsl2-distro-manager](https://github.com/bostrot/wsl2-distro-manager)，Windows 的 App Store有付费的版本（捐赠用），Github上免费下载。

#### 2）Navicat

> 数据库管理工具，待更新

#### 3）Github TOC 生成

> Github本身不支持TOC目录，得自己生成，那就这个了恐怕只能。但是我想要的是可以直接替换[TOC]的啊！

- Bash 脚本实现的：[github-markdown-toc](https://github.com/ekalinin/github-markdown-toc)
- Go 实现的：[github-markdown-toc.go](https://github.com/ekalinin/github-markdown-toc.go)

### 三、日用工具

#### 1）压缩软件 (win/mac)

> 因为压缩软件是在太多，这里直接汇总：

Windows用的：

- [WinRAR 压缩软件(中文站)](https://www.winrar.com.cn/)
- [WinRAR archiver(国际站))](https://www.rarlab.com/)

Mac用的：

- [Keka - macOS 压缩文件管理器](https://www.keka.io/zh-cn/)
- [The Unarchiver | Top Free Unarchiving Software for macOS](https://theunarchiver.com/)

#### 2）PDF 虚拟打印机 (mac)

> Mac里面经常可能需求，比如把好几页A4的PDF合并到另外一个A3的PDF；再或者需要把PDF转化为打印稿（图像输出）。总之或者希望调试一下打印输出的文件，就用这个了。

- 下载链接：[rodyager/RWTS-PDFwriter](https://github.com/rodyager/RWTS-PDFwriter)
- 图片效果：

<img src="./Utility.png" alt="Utility" style="zoom:40%;" />

#### 3）OBS录屏软件 (win/mac/linux)

> 比较惊喜的一件事情是，mac现在也可以支持内录声音了，非常好的OBS，使我的直播旋转。

- [下载链接](https://obsproject.com/)

#### 4）检测屏幕 (mac)

> 一个很奇怪的软件，比如你担心自己电脑屏幕有没有坏点，那就用这个检测一下，跑一下就可以看到，和苹果店的检测是一个效果

- [App Store (Mac) 下载链接](https://apps.apple.com/tt/app/pixelstester-test-monitors/id1613340764)

