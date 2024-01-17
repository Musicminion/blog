---
title: IEEE白嫖Overleaf即将失效，又该何去何从？
tags: [Overleaf, Latex, 白嫖, IEEE]
date: 2024-01-17 16:23:00
index_img: 2024/01/Without-IEEE-Overleaf-Where-to-Go/university-purchase-overleaf.png
banner_img: 2024/01/Without-IEEE-Overleaf-Where-to-Go/university-purchase-overleaf.png
author: Musicminion
---


## IEEE白嫖Overleaf即将失效，又该何去何从？

> 2023年7月还是8月的时候，我正在复习考研数学。有一天我的一个群友「我心永恒」发布了一篇博客《[白嫖 overleaf 会员](https://wxyhgk.com/article/overleaf-bp)》，看完之后狂喜的我立马打开了 IEEE 官网，注册+关联一系列丝滑的操作，获取到了免费版的「Overleaf Pro」，殊不知几个月后，国内开启了白嫖IEEE的狂潮，结果可想而知...

### 一、背景

大三上学期的我，由于是一个狂热的Overleaf开发者（没错，疫情封校期间，我花了好几周开发出来的Overleaf接入单点登录系统），并逐渐把我的一些写作（诸如课程论文）迁移到 $\LaTeX$ 上。我当时用的是我们学校[自建的SJTU Overleaf](https://latex.sjtu.edu.cn/)，当时的我还不是很熟悉latex写作的流程，所以用了云平台这种环境。

很快时间来到大三的暑假，我开始复习考研，数学一轮过完后，感觉公式太多，很多公式**记不住**，因此急需一个可以把公式汇总的笔记，手写我肯定是不干的，`markdown`又太丑，不方便打印和目录管理，于是开始着手考虑 $\LaTeX$。就在某一天，我的一个群友「我心永恒」在QQ里面分享给我们白嫖 Overleaf 的技巧，看完之后狂喜的我立马打开了 IEEE 官网，注册+关联一系列丝滑的操作，获取到了免费版的「Overleaf Pro」这下可以愉快的开始Latex写作了！因为「Overleaf Pro」可以有：

- **可视化的编辑器**，对于我这种新手非常友好
- **符号面板**，记得不清楚的数学符号可以直接查找
- **Github集成**，让笔记多一份备份和版本管理
- **更长的编译时间**，特别适合大型项目

于是乎，在研究了一番`ctexbook`这个模版之后，我断然决定：

> 在Overleaf上，用`ctexbook`开始我的数学公式笔记整理。

一晃就是一周，我拿出我曾经爆肝原神的热情，用不到两周的时间，完成了我的第一本书，考研数学笔记。

![我的第一本书](my-first-book.png)

当时完成的第一版，大概是**100页**左右，包含了高数的、线代、概统的所有内容。后来我又不断完善，加入了很多易错点、原理分析的内容

![书籍内容展示](book-display.png)

后来，陆陆续续的把专业课、考研政治、考研数学的都迁移到Latex平台。感觉非常舒适，好几次还把书籍完整的打印了出来...对于我的复习，效率也大大的提高。

考研的日子很快就结束了，一转眼来到一月份，在不记得是网上搜索了一下白嫖、Overleaf两个关键词后，还是知乎主动给我推送了之后，我发现了这篇文章：[免费升级Overleaf Premium（IEEE Collabratec） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/667078196)

文章固然没什么看头，我感兴趣的**从来都是评论区**，打开一看，评论区说**居然不能薅羊毛了**，**12月最新关联的Overleaf已经没有Pro资格了**，这下把我吓到了！难道是官方要开始整顿了吗。那白嫖还可以用吗？

![白嫖结束](end-of-free-overleaf.png)

于是乎我抓紧时间各路搜集信息，开始在小红书搜索，发现已经有人询问过了Overleaf官方，关于白嫖的结束是否属实，得到的完整回复是：

> Thanks for getting in touch about this.
>
> As of December 2023, IEEE is no longer providing access to Overleaf premium features for Collabratec users.
>
> Users who have already received the upgrade from IEEE via Collabratec will see their access to Overleaf's premium features (through the IEEE integration) end in late January, 2024.
>
> You can still link your lEEE Collabratec account to your Overleaf account, but this won't give you access to Overleaf's premium features. It will still be possible to log in to Overleaf using your registered IEEE email if you've linked your IEEE Collabratec account to Overleaf. Please note that linking your Collabratec account to Overleaf allows you to use Overleaf to edit LaTeX documents created in Collabratec. Please note that lEEE terms and conditions apply to documents created in Collabratec.

总结中文的意思就是：

- IEEE不续费了
- 白嫖了的最多用到24年1月（现在已经是1月17日）
- 没白嫖的12月已经无效，可以关联IEEE账户，但是无法获取Premium

这下子，我觉得着急的恐怕不是**没有白嫖到的人**，而是**已经用习惯Overleaf Pro计划**的人了，甚至文档大部分都在Overleaf官服上面的人了！这将意味着：

- 编译时间回退到`20s`，众所周知20秒的编译时间，稍微复杂一点的书籍、绘图、带图片的文档、论文，**基本铁打的超时**。也就是说我Overleaf里面的项目基本都无法编译了！（**最致命伤**）
- 没有符号面板，找符号更麻烦了（**这我勉强可以接受**，因为我基本都记熟了）
- 没有Git集成，一旦官网Overleaf崩溃，完全没有备选方案。（**比较难受**）
- 几乎无法迁移（Overleaf的历史管理用的是自己的，除非我把Github的项目导入到我私有的Overleaf社区版本，但是，社区版不支持Git Sync）（**究极难受**）

至于Dropbox，说实话我不用这个，因为本来就是国外的网盘，实用性不大。

> 说白了，一个白嫖的东西，突然开始了收费......我还有大量的文档在里面...

### 二、羊毛出在羊身上，历史总是惊人的相似

大学期间没少白嫖过东西，回顾当年**Adobe土区大范围封号**、**23年3月微软Office E5续订大范围失效**、`qyi`续杯E5封号浪潮，也是如此，甚至你还可以画出过程的时间线

1. 少数人通过外网**了解到某某的白嫖渠道**、低价获取渠道
2. 部分商家在淘宝等平台，开始售卖，**赚取信息差**
3. 通过淘宝买的部分用户发现端倪，得知了所谓的**信息差**
4. 部分人在国内，用中文文章、视频在知乎、Bilibili、抖音、小红书、博客**大范围传播白嫖教程笔记、视频**
5. 视频、文章、笔记**爆火**，**大量白嫖用户开始涌入**，笔记传播者收获了大量的流量、关注
6. 商家开始整顿、**封号、暂停续订或者暂停订阅**
7. 部分用户为了体验，转入付费，上车；部分用户转用其它工具

后来转头一想，原来商家才是最大的获利者，你以为你白嫖到的是 **Free Plan**？NoNoNo，我只觉得我反而让自己陷得更深，白嫖结束后，笑到最后的，可不是我们这些白嫖者。

### 三、白嫖Overleaf即将失效，又该何去何从？

#### 1）Why no purchase?

> 先不说太远，我发现了一件有趣的事情。

Overleaf的官网展示了所有订阅了Overleaf的大学，正如下图所示，可谓是两个特点：

1. 订阅的大学非常多，遍布各地
2. 环大陆上线

![购买了Overleaf的大学](university-purchase-overleaf.png)

拿我自己学校举例子：

![SJTU用户状态](sjtu-status.png)

- **月活跃用户2484**，**月编辑文档的数量高达11282**，这还统计的仅仅是`sjtu`邮箱的用户
- 我们学校有自建的Overleaf，但是众所周知社区版的Overleaf就是一个**阉割版**，甚至很多关键时间节点（毕业季、美赛）**都会崩溃**，甚至版本用的还是**1年前的Sharelatex**

> 所以问题来了！为什么我们宁愿用开源版的、阉割版的，也不愿意花钱买一个付费版的？

当然有人会跳出来，啊我们要数据安全！数据不存储我们学校自己那里，怎么可能给这些美国佬呢？我们规定就要求这些提供互联网服务的商，数据必须存储在国内？

好像有道理，但是

- 首先Overleaf有私有部署的Server Pro，也包含了git集成与大部分付费功能
- 其次，上图里面2000多人，编辑的1w多个项目，他们真的介意自己的数据存在亚马逊吗
- 所以，**所谓数据位置，只不过是借口罢了**，Overleaf是一家英国公司，叫做Digital science，这么一说哪些美国的大学似乎并不是很介意这样。更何况我认为，涉密的东西，早就断网了，更不可能拿出去做研究。**根本原因**就是**不想买，钱用到了别处**，至于花到哪里了？需要用户自行脑补

回想起我们23年暑假学校的MATLAB风波，学校拒绝续订MATLAB，然后**大群学生通过外卖事件、知乎治校**，强迫学校答应续费Matlab，别说Matlab是工科学校绝大多数人都要用到的软件，都花了这么大气力才买到手，Overleaf这种看似「可有可无」的软件，更是不可能订阅的了！

20年我初入交大的时候，正版软件琳琅满目、VM Ware、Adobe全家桶、Matlab、SolidWorks等等起码20多种软件，Win和Mac全部囊括，而如今的正版软件，**我只想缓缓打出一个「？」**

![交大正版软件](sjtu-software.png)

我TMD的**软件都去哪了**？最让我好笑的事，喂喂喂，你一个**VirtualBox开源软件还好意思放在正版软件滥竽充数**，你是负责付费了还是负责开发了？再看同样的文档编辑，金山文档、WPS、Office，且不说金山文档就是WPS，这怕不是担心自己软件太少了被发现了吧。

那既然如此，咱们要不都优化一下

- Windows，不买了，教室电脑全部安装Ubuntu
- Office？还要啥自行车，咱们支持开源的Open Office
- 正版软件也不用这么叫了，改名为**开源软件**

吐槽的东西说完了，结论：

- 能有开源的，打死不付费
- 能有白嫖的，坚决不订阅
- 能有破解的，自己去下嘛
- 能有阉割版的，自适应使用，忍忍就好
- 自己日常要用的，必须买买买
- 学生用不用的，必然深思熟虑

#### 2）Where to go?

说完了这些，总算回到了主题，怎嘛办？Overleaf停止白嫖，又该用什么？是付费还是转用本地？我总结了一下目前几乎是所有的Latex写作方案：

- 本地写作(预留 5GB 空间)
  - TexPad(Mac)+本地Tex环境
  - VSCode+本地Tex环境
  - 原生的TexStudio+本地Tex环境
  - VSCode+本地Tex容器环境
- 远程写作
  - Github Codespace + Tex容器环境
  - 学校随时会崩的 Sharelate
  - 自建 Overleaf 社区版
  - 官网 Overleaf 免费版自适应
  - 官网 Overleaf 付费订阅(9刀一个月)
  - 国内自研的 TexPage
  - 国内自研的 Slager
- 放弃Latex，不失为一种选择...

方法是琳琅满目，但是无非初分一下就是：

- 坚持 Overleaf 官网
  - 希望简化环境配置
  - 希望用到可视化编辑器
  - 希望随时随地都可以写作
  - 需要协同编辑
  - 需要与Github同步
  - 之前的版本管理不希望丢弃
  - 不介意网络连接问题/有连接方法
  - 适合带电脑、iPad外出时写作，因为编译密集、CPU占用大、耗电
- 用回本地VS Code
  - 电脑空间大
  - 熟悉环境配置
  - 需要节约开支
  - 希望个性化的写作界面（VS Code）
  - 介意网络连接，希望稳
  - 不适合电脑外出时写作，因为编译密集、CPU占用大、耗电
- 用回学校的Overleaf/自建的Overleaf
  - 上面两个实在没有选择
  - 自建开支一个月服务器30元，学校的0开支
  - 可以接受过期的版本、新功能都没有，自适应

说实话我：

- 不希望把我电脑本地占用的乌烟瘴气的
- 自建的费用一个月30，Overleaf付费学生一个月60左右，差这30块钱没有必要
- 网络连接质量很好
- 需要与Github同步、之前的版本管理不希望丢弃

综合考虑，付费买Overleaf成了最佳选择，也是唯一选择，现在就等过期了吧，害。
