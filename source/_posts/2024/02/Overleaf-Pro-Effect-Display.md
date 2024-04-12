---
title: Overleaf Pro开发展示
tags: [Overleaf, Overleaf Pro, Pro, 软件开发]
date: 2024-02-24 17:33:00
updated: 2024-04-10 14:15:00
index_img: 2024/02/Overleaf-Pro-Effect-Display/register.png
banner_img: 2024/02/Overleaf-Pro-Effect-Display/register.png
author: Musicminion
typora-root-url: ./Overleaf-Pro-Effect-Display
---

## Overleaf Pro开发展示

2024年4月份，Overleaf白嫖结束，IEEE也是官宣了白嫖的终止。虽然我早就开始开发overleaf pro为这件事情做准备，但是白嫖的截止让我的时间感觉更紧凑了一些。

> 经过我寒假一个多月的爆肝开发，以及参考了中科大一位神仙[ertuil@Github](https://github.com/ertuil/overleaf)魔改的Overleaf，我已经把Overleaf Pro版开发的有一个初步的模型了。讲真与官网的体验已经非常接近了。（我都想拿来卖钱了）

> 具体公开测试待定，因为坑/Bug都还没有填完。先放个效果图吧。

### 一、效果展示

#### 0）Ayaka-Theme

> 某个风和日丽的下午，我突然脑子一热，于是思考。我发布overleaf pro的组织都叫@ayaka-notes了，为什么不做一个神里绫华主题的overleaf呢？于是乎就有了下文。

然后经过魔改css，加上修复源代码，webpack重启了三四次才成功的（哭哭

![ayaka-Theme01](./ayaka-theme01.png)

虽然不敢说配色有多上档次，但是还是参考绫华的配色主题了！毕竟我前端是废的，也算看腻了旧的样式，换换新的口味，也许是个不错的选择，希望用户们能喜欢这个暗色主题（虽然我平时个人用的最多的还是亮色浅色主题）

![ayaka-Theme02](./ayaka-theme02.png)



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

为啥没有跟官网一样的引文搜索？因为那个又需要加一个数据库(Elastic Search)。如果用过的就知道，这个配置还需要分词器，本来说实话组件就已经一大堆了，大家服务器能不能跑得动都是个问题，**所以暂且不加了**，后面看心情是否加和官网一样的引文补全功能哈哈。

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
texlive-full  2020.1  a274f5d89022   8 days ago  12.5GB
texlive-full  2022.1  4ddfdba00721   8 days ago  12.8GB
texlive-full  2021.1  ccc4f9c281bc   8 days ago  12.5GB
texlive-full  2023.1  8b2ac4360b62   8 days ago  13.2GB
```

但是这四个镜像底层都是公用的一个底层的Base层，比如他们的字体都是一样的，所以实际空间会比会这个小。

### 二、浅谈Overleaf项目
Overleaf是个微服务，看他仓库的名字就看得出来，项目里面有个`services`的文件夹。编程语言是`js`,前端用的是pug、tsx、jsx混着用，后端用的nodejs，git-bridge是用的java，部署架构都基于Docker/k8s。

最近探索历史，Overleaf大概前身是Sharelatex，差不多19年被Overleaf收购了，后来才有的这样一个Latex在线编辑器。Sharelatex诞生的年代比较早，差不多是14年的时候，我看过commit的记录，那个时候各种组件库还不是很全，比如我们今天开发app，那什么ant-design，信手拈来，非常现代化的组件，但是那时候可没有！

所以没有选择，Overleaf的很多组件只能自己写的，而且目前来看也几乎没有任何（公开的）文档。所以说你要放在今天的2024年，开发一个在线编辑latex的工具，组件库可全了。你会发现国内的TexPage，用不到3年的时间几乎写完了Overleaf的所有功能，而且我相信人家的后端肯定要比overleaf这种屎山项目要优雅。而不是nodejs这种一堆controller。前不久还有scienhub，据说用了vscode的编辑器，甚至可以接入一些插件。

我不知道为什么pug那个东西还有人这么喜欢，说实话我很讨厌这种为了简化而简化，json固然简单，但是代替不了xml，js中`return`依然写的是html的语言，html也是如今前端开发的通用。硬生生的把pug拿出来简化html，我只觉得和python一样，让我注重各自细节缩进，而不是我编写的内容。反而我还需要额外学习一些inlude等各种语法。

说实话我真心觉得，overleaf应该重构所有的代码，重构整个项目(话说的有些大，但是他之前的项目只能说维护起来过于复杂)。比如那个web微服务，把本来就很直观的比如符号面板的代码、或者git集成的那些部分的代码，硬生生的抽出来，作为一个module，然后一个一个import进去，说实话我也知道，他这是为了方便管理Server pro、公有云版、社区版，但是正式这样，让这个项目变得丑陋不堪。

在2024年的今天，go、java各种语言都比较成熟的前提下，还坚持选择nodejs反而让我觉得不合适。而且overleaf那土气的黑白绿界面，近10年来几乎没有什么改变，如今看到的唯一变化也就是，把从土气的黑色，变成了亮色的白。

但是这么土气的项目，支持起来全球人的科研，成为科研狗们离不开的工具，也大概只能算是没有什么竞品。国内那个TexPage我还是挺佩服的，毕竟大家都知道overleaf开源，开源那就没有什么竞争力，因为大家都喜欢白嫖，你做一个付费的东西出来，很少有人为了那不到5%的功能，花钱去买。TexPage有勇气去做我还是很赞许的。

但你要问我用不用，我当然不太愿意用TexPage。一来，毕竟太小众，就像gitlab一样，指不定哪天崩了，数据都给你一键清空。二来，已有的项目不太愿意迁移过去。

我们学校时不时有同学会问，为什么社区版没有xxx功能，能不能让学校买，其实也没办法，有些功能overleaf就是为了赚钱，难道一个符号面板还要收费？好像没道理，一个前端功能。但是嘛，仔细研究我甚至发现，连一个前端，都涉及到编辑器里面的消息队列，啊？浏览器里面还有消息队列？真就是离谱。所以我既想骂的同时，又想说这些功能其实开发不容易，擅长白嫖的用户总感觉，你能不能让我买断。

再说在2024年给overleaf做一个管理员界面难吗？不难，一个用户的查询getAll，一个前端的页面加上antd的组件库，轻松写完。唯独缺点就是在你不知道的角落，会有什么代码。举个例子，当你要删除用户的时候，用户的项目怎嘛办？处理好这些问题才是搞定这个屎山项目的关键。

一两年前，overleaf的社区还算很活跃，经常有人愿意contribute。那时候我遇到bug，提出issue时候还会有人回复我。如今看着长长的issue没有人回复，pr没有人Merge，也不知道overleaf是不是真的就不想听用户的声音了。之前看到一个用户提了十年的Feature就是，为什么不能在全项目范围里面搜索？十年啊！为什么没有人看，我不理解。于是我看到有人就在下面说，为什么overleaf就像死扣那个可视化编辑器，而不愿意听取用户的声音？

> If only they would listen to community feedback...
> There is a lot of stuff ongoing in development but I think they should do the essentials first before driving deep into the visual editor improvements. 😪

就说这些，希望overleaf能有所改进吧！

### 三、后面的计划

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