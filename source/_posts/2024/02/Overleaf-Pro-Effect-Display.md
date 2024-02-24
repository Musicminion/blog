---
title: Overleaf Pro开发展示
tags: [Overleaf, Overleaf Pro, Pro, 软件开发]
date: 2024-01-17 16:23:00
updated: 2024-01-18 12:30:00
index_img: 2024/02/Overleaf-Pro-Effect-Display/register.png
banner_img: 2024/02/Overleaf-Pro-Effect-Display/register.png
author: Musicminion
---

## Overleaf Pro开发展示

> 经过我寒假一个多月的爆肝开发，以及参考了中科大一位神仙[ertuil@Github](https://github.com/ertuil/overleaf)魔改的Overleaf，我已经把Overleaf Pro版开发的有一个初步的模型了。讲真与官网的体验已经非常接近了。（我都想拿来卖钱了）

> 具体公开测试待定，因为坑/Bug都还没有填完。先放个效果图吧。

### 一、效果展示

#### 1）注册

我本来考虑的是和我们交大的Overleaf一样，做一个用户输入邮件，然后激活登录的，但是后来一想，很多用户不想配置邮件，甚至不太会配置邮件登录系统，那这个时候反而最原始的注册才是最好的。

**注意**：用户注册成功后会自动跳转到登录页面。该界面支持国际化，哪怕其他国家语言也是支持的。

![注册](./register.png)

#### 2）多账户管理

把官网的东西直接抄过来了，没什么好说的，**需要配置好邮件服务**，然后才能搞那个电子邮件验证，验证后才可以改用户名，反正更安全了吧。

![账户管理](./account-setting.png)

#### 3）符号面板

还是跟官网一样，没什么好说的，费了我好几天才写完，最后用了一个很trick的技巧才把模块接上去的。因为他是用的模块化。唯一区别就是没有那个小叉叉，关闭的方法就是把符号面板那个开关**再点一次**。

![符号面板](./symbol-panel.png)

#### 4）Docker编译

为了让用户体验到不同版本的TeXLive，我引入了Docker编译。同时也更加安全。在项目的设置面板里面，可以选择版本。注意这里面的`2023.1`并不代表一月份，而是代表第一个版本。至于你要问我为什么会有这样奇怪的命名方法，你得问Overleaf。

![多版本TEXLIVE编译](./multiple-texlive.png)

#### 5）审阅功能

不想多说，跟官网一样的功能。

![审阅面板](./review.png)

#### 6）全局主题

这个是Overleaf的隐藏主题IEEE款的，反正我把三个都给大家加上了，大家随意使用。

![全局主题](./overall-theme.png)

#### 7）引文自动补全

为啥没有跟官网一样的引文搜索？因为那个又需要加一个数据库，本来说实话组件就已经一大堆了，大家服务器能不能跑得动都是个问题，**所以不加了**，后面看心情是否加和官网一样的引文补全功能哈哈。

![引文自动补全](./cite.png)

#### 8）s3存储

Overleaf支持原生的亚马逊云的s3存储，如果自己有s3存储服务，或者想用阿里云的，给自己数据加一层保障，可以配上s3存储系统。下图是效果展示。

![s3存储](./s3.png)

#### 9）TeXLive镜像调优

四年的镜像大小，每个镜像包含的内容：

- [Google Fonts](https://fonts.google.com/)
- [Microsoft msttcorefonts](https://packages.ubuntu.com/jammy/ttf-mscorefonts-installer)
- [Overleaf supported fonts](https://www.overleaf.com/learn/latex/Questions/Which_OTF_or_TTF_fonts_are_supported_via_fontspec%3F)
- 和Overleaf官网一样的latexmk编译流
- 软件包系列：fontconfig、inkscape、pandoc、python3-pygments、wget、python3
- 软件包系列：gnupg、gnuplot、perl-modules、perl、ca-certificates、git
- 软件包系列：ghostscript、qpdf、r-base-core、tar

镜像大小大概是：

```
ghcr.io/ayaka-notes/texlive-full  2020.1  a274f5d89022   8 days ago  12.5GB
ghcr.io/ayaka-notes/texlive-full  2022.1  4ddfdba00721   8 days ago  12.8GB
ghcr.io/ayaka-notes/texlive-full  2021.1  ccc4f9c281bc   8 days ago  12.5GB
ghcr.io/ayaka-notes/texlive-full  2023.1  8b2ac4360b62   8 days ago  13.2GB
```

但是这四个镜像底层都是公用的一个底层的Base层，比如他们的字体都是一样的，所以实际空间会比会这个小。

### 二、后面的计划

>  文档是不可能写的, 这辈子都不可能写的, 只有每天挖挖坑才能维持得了生活. GitHub上个个都是人才, 代码写的又好看, 我超喜欢里边的!

开发的东西太多，本来还想写写开发的过程的，后来放弃，文档是不可能的写的。

下次要是有人催我开发Overleaf我就直接把这个图扔给他（不是），这家伙的代码太过复杂，很多东西都是模块引入的，还有下面这个我都不知道套了多少层了，这个写前端的简直是个神仙！反正改这种代码实在难，大伙见谅。

![Overleaf的屎山代码](./Overleaf-Code.png)

还是写一个计划吧，大概率不会填坑，看心情：

- 管理页面，比如用户管理
- 还原出原生的模版系统（需要先做好管理面板）
- OAuthAPP与OAuth登录
- 一些文献集成工具（需要作为oauthAPP）
- Git集成
- 一些云盘集成
- 一些快捷键
- 定期合并上游的代码，发布镜像