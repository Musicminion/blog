---
title: 2026 虚拟机部署 Office Online Server 部署教程
date: 2025-12-11T23:29:38Z
lastmod: 2025-12-12T16:46:51Z
---

## 2026 虚拟机最新版 2026 Office Online Server 部署教程

### 一、背景 + 效果展示

#### 1）背景介绍

说实话，我馋微软的 Office Online Server 很久了，为什么？因为我们交大也在用：[Webview SJTU](https://webview.sjtu.edu.cn/op/generate.aspx "Webview")，但是这个网站之前是可以预览外部 URL 的文件的，不知道可能后来被滥用的多了，就增加了额外的限制，只允许预览交大内部 canvas 文件 Office。他的界面就长这样，很简单，也很微软.这也是我很喜欢微软的原因，相比较国内各种流氓弹窗软件，微软的网页做的真的非常人性化，尽管他还是一个 2016 年甚至更早的的软件，但是依然非常优雅放在今天：

![image](assets/image-20251212115859-9y241p8.png)

回到正题，相比较网上各种“杂牌”Office，包括但不限于 WPS、Only Office、Liber Office 等，你会发现你的文档永远会出现格式不一样的问题。但是微软的 Office 之所以是标杆，因为大家都在用，你不可能因为部门里面自己或者个人习惯，用 WPS 或者其他 Office 预览商，结果就很显而易见，别人打开你的文档后，就是格式乱的一团糟。

毕竟，丢失了格式的文档，可以说丢失了排版的灵魂，完全不能说是一个合格的文档，所以有一个权威的排版预览文件，会是非常方便的！

但是国内基本很难找到一些 Office Online server 的教程，有也是很老的版本，大部分都会告诉你你需要下载 Windows Server 2012 R2 然后安装，但是这个系统最逆天的还是 IE 浏览器，操作起来非常困难。

其实我的建议是不要看网上各种教程，很多都已经过时了！一些基于 Windows Server 2012 部署的可能会存在各种打补丁的教程，而且最离谱的是：他们会说你不能使用更新版本的 Windows Server，比如 2019 2022 部署！但是我实测发现是可以的，所以我们要相信微软的官方文档。

一句话：跟准微软官方文档教程：[部署 Office Online Server - Office Online Server | Microsoft Learn](https://learn.microsoft.com/zh-cn/officeonlineserver/deploy-office-online-server)

#### 2）一些开始前疑问

> 有些朋友可能跟着网上的教程部署完了还是有各种疑问，所以我们在开始前解答明白。

**问题一：这个东西是否需要 License？网传编辑是需要额外 License 吗？**

回答：从安装部署的角度，**完全不需要**，但是企业要是部署合不合规请自己参考微软的官方说明。我只能说这个东西**只要有安装包就可以安装**，并且所有的功能都可以解锁，不需要任何密钥、不需要任何导入 License 过程，但是是否合规请根据自己的企业情况。本教程不对违规部署造成的损失或者赔偿负任何责任。

网上之前有人说这个软件的编辑是需要 License 的，实际上只是在你开启编辑功能的时候，会在命令行里面问你是否有 License，如果你输入 Y，微软就默认相信你。

**问题二：从哪里获取到 Office Online Server 的官方安装文件？**

回答：这个并没有。官方现在已经把可以公开下载的链接基本都移除了。按理来说，这个应该是给购买的批量的企业用户。

> 以下内容摘自[官网的解释](https://learn.microsoft.com/zh-cn/officeonlineserver/office-online-server)：
>
> 可以从[批量许可服务中心下载 Office Online Server (VLSC) ](https://go.microsoft.com/fwlink/p/?LinkId=256561)。 Office Online Server 是 Office 的一个组件。因此，它将显示在每个 Office 产品页面下，包括 Office 标准版 2016、Office 专业增强版 2016 和 Office 2016 for Mac 标准版。
>
> 对于许可证符合 OOS 条件但无法通过 VLSC 获取的客户，可以执行以下操作：
>
> - VL Open 客户可以联系[支持中心](https://www.microsoft.com/Licensing/servicecenter/Help/Contact.aspx)。
> - 从 Microsoft 在线购买 O365 的客户可以通过 Office 365 管理中心或[联系支持人员](https://learn.microsoft.com/zh-cn/microsoft-365/admin/contact-support-for-business-products)提交请求。

目前：

- Office Online Server 的更新包、Office Online Server 语言包都是可以官网公开下载的
- Office Online Server 的软件本体几乎没有官方渠道，另外一个可以获取的官方渠道是 MSDN 的企业订阅（不是 MSDN 我告诉你，这个是个国内搭建的资源网站），所以只有网上各种流传的网络资源

**问题三：有没有快捷部署的 Docker 方法？**

回答：没有。必须安装在 Windows Server 上面。

**问题四：怎么开启编辑功能？**

回答：自建 wopi 或者使用开源网盘 Nextcloud 对接 Office online server 集成即可。其实我更推荐用后者，因为更稳定，有专门的开源社区维护。

#### 3）效果展示

演示预览数学 Office 文档的效果：

![image](assets/image-20251212150833-b6qjeqk.png)

演示编辑语文文档的效果（编辑效果其实一般），但是也比其他的软件好很多了：

![image](assets/image-20251212150940-rnyw90v.png)

演示编辑 PPT 效果：

![image](assets/image-20251212151046-ao0b4vk.png)

演示表格预览和编辑效果：

![image](assets/image-20251212151119-vtgjp5f.png)

‍

### 二、部署教程

我这里演示我使用群晖的 VMM 虚拟机管理套件进行安装 Office Online

#### 1）准备安装资源

需要准备的资源有：

- Office Online Server 的安装镜像：我这里用的是 MSDN 的 `cn_office_online_server_last_updated_november_2017_x64_dvd_100181918`​：[下载链接](https://msdn.itellyou.cn/)
- Office Online Server Language Pack：[下载链接](https://www.microsoft.com/en-us/download/details.aspx?id=51963&amp;msockid=3febc762bd086d263ca1d11dbc2b6c94 "下载链接")
- Windows Server 2022 的安装镜像：我这里用的是 MSDN 的 `zh-cn_windows_server_2022_updated_sep_2024_x64_dvd_cab4e960`​：[下载链接](https://msdn.itellyou.cn/)
- Office Online Server 的最新版更新补丁：去找这个人的博客 [Office Online Server – Stefan Goßner](https://blog.stefan-gossner.com/tag/office-online-server/)，然后可以找到 [Download Security Update for Microsoft Office Online Server (KB5002817) from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=108483)，这是 2025 年 12 月份的更新
- 虚拟机 Tool 镜像（可选，根据你 VMware 或是其他虚拟机，主要是方便你粘贴命令）
- 两台虚拟机（必须两台，一台无法完成，需要内存大于 4GB，2 核心 CPU 以上）

可能你还需要一个电驴下载器，比如迅雷或者其他的下载器，下载资源界面：

![image](assets/image-20251212005652-53qoc96.png)

关于 Windows Server 2022 我是在[这里](https://next.itellyou.cn/Original/#cbp=Product?ID=ff70d59a-8e02-ec11-a9e5-95b21d9a899a)下载的：

![image](assets/image-20251212005929-kc526x0.png)

其实安装完成之后，我还发现一个可以下载 Office Online Server 最新版的网站，可前往：[voxMicrosoftCollection directory listing](https://archive.org/download/voxMicrosoftCollection/Office%20Online%20Server%202018/ISO/)（需要自行解决上网问题），这里面有最新版 Office Online Server 2018 November 的安装包，这个版本的安装包至今还是可以获取到微软的最新更新维护的。（离谱吧，你甚至可以在这找到全语言版本的）

其实这里给大家介绍一下，国内那些资源网址基本都给你的是 Office 2016 或者 2017 的安装包，这些安装包比较老，没法获取到微软最新的补丁安装，所以嘛，如果可以的话尽量安装最新版。

大家在下图界面下载中文版 CN 开头的就可以！

![image](assets/image-20251212115005-yb0d377.png)

#### 2）创建虚拟机系统

Office Online server 只能部署在 Windows Server 上，按照微软官方的说明。我个人一般用的群晖虚拟机集群管理我的虚拟机，大家可以根据自己的喜好，使用 VM Ware 或者其他工具。VM Ware 一般来说选择好镜像之后就自动会给你推荐好虚拟机的配置，只需要注意一件事：**网络选择桥接模式**就可以了。我这里用群晖的虚拟机给大家演示一遍装系统。

首先是创建虚拟机：

![image](assets/image-20251211233438-vxo3itf.png "创建虚拟机-选择操作系统")

然后配置虚拟机的参数，我这里配置的是 4 核心 CPU + 8 GB 的内存（建议起步 2 核心，内存 4GB 可能会有点卡），我这里选择的是 Q35 的机器类型，然后视频卡是 VGA：

![image](assets/image-20251211233651-5vf8rlt.png "创建虚拟机-配置虚拟机规格")

存储空间配置为 80 GB，设置我没有点，保持默认的设置，同理后面的网络也是默认的下一步就可以。

![image](assets/image-20251211233819-zju6jy5.png "创建虚拟机-配置存储")

然后，记得选择启动 ISO 文件为你的 Windows Server 镜像，然后其他 ISO 文件是群晖的 VMM Guest Tool：

![image](assets/image-20251211233842-4n2hku3.png "创建虚拟机-设置镜像")

用同样的方法配置两次，基本配置是一样的操作就可以了，配置好如下图所示，然后开机，我们需要两台虚拟机：

- 一台虚拟机 Master，作为域控

![image](assets/image-20251211234200-pcfnlc7.png)

然后我们就可以在 VNC 里面看到启动后的 Windows Server 安装了。

![截屏 2025-12-11 23.44.23](assets/截屏2025-12-11%2023.44.23-20251211234428-9oirak3.png)

#### 3）安装 Windows Server 2022

点击现在安装：

![image](assets/image-20251211234853-1m3wnev.png)

点击我没有产品密钥：

![image](assets/image-20251211234908-yip9fzm.png)

点击最后一个，一定记得要选择带：Desktop 的，**否则安装下来没有图形界面**，后面基本没法操作

![image](assets/image-20251211234926-t9h7h8t.png)

点击勾选同意协议，然后点下一页：

![image](assets/image-20251211234959-zj5emc5.png)

点击自定义：

![image](assets/image-20251211235015-i9gpr9z.png)

选择你的磁盘，然后点击下一页：

![image](assets/image-20251211235024-3ca8olp.png)

等待安装完成：

![image](assets/image-20251211235052-c16a14f.png)

安装完成等待重启：

![image](assets/image-20251211235217-u1u1jke.png)

重启之后就到了设置密码的界面，根据你自己的需要设置密码：

![image](assets/image-20251211235304-nlmeo0s.png)

然后我们就进入桌面了，如果是第一次使用的朋友可能不知道，微软的 Windows Server 需要按 Ctrl + ALt + Delete 解锁桌面，这个在 VNC 左边的这个按钮（依次点击 A、然后 Esc 下面的那一个按钮就可以送出这个这个类似"任务管理器"的快捷键，点一下就行）：

![image](assets/image-20251211235408-he3n56i.png)

然后输入你刚设置的密码：

![image](assets/image-20251211235525-8wg72qn.png)

然后我们可能需要安装群晖的 VMM Guest Tool，具体可以在映像-> ISO 文件 -> 下载 Synology Guest Tool 里面：

![image](assets/image-20251211235836-lgyywtt.png)

如果我们可以通过编辑虚拟机，把其他 ISO 设置为 VMM Guest Tool 镜像：

![image](assets/image-20251211235948-0wx9f0w.png)

在虚拟机里面打开我的电脑，进入 E 盘安装：

![image](assets/image-20251212000027-t5vhu1x.png)

安装：

![image](assets/image-20251212000049-v23ays5.png)

安装完成就是，然后需要重启电脑：

![image](assets/image-20251212000113-r7747s3.png)

等待重启：

![image](assets/image-20251212000211-04q1wrq.png)

用同样的方式给两台虚拟机安装好系统即可。安装完成驱动后，你应该能在虚拟机的管理界面看到两个虚拟机的 IP：

![image](assets/image-20251212000501-ecyhvka.png)

这里注意你的虚拟机必须是直接连的上层的物理网络，也就是 VMware 里面的网络配置的桥接网络选项。我们需要看到虚拟机的 IP 是和路由器里面正常内网的 IP 网段是一样的才可以。具体界面如下所示（我这里是随便截图的一个 VM ware 的桥接模式）

![image](assets/image-20251212115349-fyebauo.png)

**后面我们就用 Master 和 Webview 称呼这两台服务器**：

- Master：我们的域控服务器，负责控制集群里面的域名解析
- Webview：我们要安装 Office online server 的服务器

这两台服务器的并不能合二为一，因为微软官方规定的 Office online server 不能安装在域控服务器上面，所以后面操作有的是两个都要执行的，有的是只需要执行一次的，我会写的很清楚，大家仔细看！

#### 4）安装 AD 域

> 本小结部分的操作需要在两台服务器 Master 和 Webview 服务器上<u>**都执行一遍**</u>。

首先我们打开服务器管理器：

![image](assets/image-20251212000301-dlg2u9e.png)

点击**添加角色和功能**：

![image](assets/image-20251212000601-n2m88cq.png)

下一步：

![image](assets/image-20251212000627-z72zrvr.png)

还是直接下一步：

![image](assets/image-20251212000645-99yd6h9.png)

就这一个服务器，还是直接下一步：

![image](assets/image-20251212000704-t071apt.png)

然后勾选：

![image](assets/image-20251212000807-qtcj51z.png)

然后点击**添加功能**：

![image](assets/image-20251212000825-ihhyxdn.png)

然后这一页我们什么都不管，直接下一步：

![image](assets/image-20251212000853-j9lptf1.png)

还是下一步：

![image](assets/image-20251212000904-j1xli50.png)

直接点击**安装**：

![image](assets/image-20251212000914-kwoxwro.png)

等待安装完成：

![image](assets/image-20251212000936-b24ewx6.png)

完成后，本部分安装到此结束，注意这个操作到这里是两台服务器都要执行的！

#### 5）给 Master 提升为域控制器

> 特别注意：本操作只能在 Master 上执行，另外那台 Webview 服务器，到上面的步骤你点默默退出叉掉就可以了。

在 Master 服务器上，点击**将此服务器提升为域控制器**！

![image](assets/image-20251212001113-syrrqcv.png)

选择添加新林、然后输入你的根域名，注意，如果你自己有一个域名，其实最好不要填这个域名，尤其是你可能在公网上面有单独的解析的域名，最好填写一个有点不一样的，比如加一个 internal 之类的，避免内外网解析的冲突。

填写完成后点击下一步：

![image](assets/image-20251212001540-tl23d7u.png)

然后这里需要设置一个密码：

![image](assets/image-20251212001738-irrujl1.png)

直接点下一步，不用担心：

![image](assets/image-20251212001754-88bizhj.png)

这里也是直接下一步，他都为我们设置好了：

![image](assets/image-20251212001822-pv8uenf.png)

直接**下一步**：

![image](assets/image-20251212001841-cw34zd7.png)

直接点击**下一步**：

![image](assets/image-20251212001850-0jydq6s.png)

等一会先决条件检验，然后点击**安装**：

![image](assets/image-20251212001910-eqn5m4o.png)

然后服务器会需要重启一下：

![image](assets/image-20251212001957-829x5bv.png)

#### 6）给 Webview 服务器配置 IP

> 特别注意：本操作只能在 Webview 上执行。

前面我们在虚拟机管理界面看到的 Webview 的 IP 是 192.168.3.13，如果不确定你可以打开命令行 Power Shell 输入 `ipconfig` 查看一下（找不到命令行的去开始菜单找）：

![image](assets/image-20251212002227-56ja1ht.png)

从开始菜单进入控制面板，然后进入 网络和 Internet、进入网络共享中心：

![image](assets/image-20251212002307-axybzdn.png)

然后进入到这里，点击以太网：

![image](assets/image-20251212002350-ce94718.png)

我这里是建议**<u>先把 Internet 协议版本 6 的勾选删除</u>**掉，因为很可能导致解析错误，然后再**点击 Internet 协议版本 4**、然后点击**属性**：

![image](assets/image-20251212002426-uz0f56h.png)

然后按照这样填写：

- 记得勾选使用下面的 IP 地址（根据你的实际填写）
- 上面的第一个 IP 地址添加你 Webview 服务器的 IP，然后子网掩码根据你路由器，默认是点一下自动弹出来的
- 默认网关填写你路由器的 IP（根据你的实际填写）
- DNS 这里记得**填写域控服务器的 IP**（根据你的实际填写）
- 这里万万不可照搬！记得根据你虚拟机获取到的 IP 填写！
- 备用 DNS 可以不填

![image](assets/image-20251212002635-sjjcbxq.png)

上面的步骤完成后记得点确认保存，然后我们打开系统设置，划到底部打开高级系统设置：

![image](assets/image-20251212002931-liaag90.png)

然后依次打开系统属性里面的更改，然后右边的：

- 计算机名最好填写 webview
- 隶属于：填写你刚**给 Master 提升为域控制器中，添加新林时候填写的的域名**

![image](assets/image-20251212003015-0cod87d.png)

然后会弹出登录：

- 用户名输入：Administrator（也不知道哪个大聪明想出来这么长的名字）
- 密码输入你创建虚拟机的时候，管理员的密码，其实你最好让两个虚拟机的密码一样的，不然很麻烦区分

![image](assets/image-20251212003203-1k7bcng.png)

等待片刻，可以获取到加入成功的消息，才表示加入成功，如果你没有成功，建议重启你的 Webview 服务器，然后重新执行：

![image](assets/image-20251212003258-n1dnz2v.png)

然后老老实实重启吧：

![image](assets/image-20251212003402-ujkeg4d.png)

#### 7）在 Master 服务器中添加 Webview 服务器

> 特别注意：本操作只能在 Master 上执行。

接下来我们回到域控服务器里面，然后在服务器管理器里面，右键点击所有服务器，然后添加服务：

![image](assets/image-20251212003442-7ayt9yr.png)

然后点击查找就可以：

![image](assets/image-20251212003532-0tg5u0p.png)

双击 Webview 就可以添加：

![image](assets/image-20251212003553-o2krtes.png)

顺利的话你应该可以看到：

![image](assets/image-20251212003621-fzrvasi.png)

注意一下这里如果发现联不上，比如你在阿里云这种环境，很有可能是内网的安全组防火墙没有打开端口，记得去防火墙放行一下端口。

接下来我们专治强迫症，右键这里可以启动性能计数器：

![image](assets/image-20251212003711-ocrvtt5.png)

启动之后就是完美的了！

![image](assets/image-20251212003742-vz2jujw.png)

#### 8）（可选）给 Webview 虚拟机开启远程桌面

这个操作你可以根据实际情况哈，如果你习惯或者会使用远程桌面，可以在设置里面打开，然后用你习惯的远程桌面链接，如果不会就老老实实里面执行吧：

![image](assets/image-20251212003944-wlzeiy0.png)

#### 9）在 Webview 里面安装必要组件

> 特别注意：本操作只需要在 Webview 上执行。

既然 Windows server 里面有浏览器，都可以直接打开搜索微软官方文档，然后找里面的命令行教程：

![image](assets/image-20251212004123-683a6wv.png)

然后我们第一条要执行的命令就是（因为我们用的是 Windows Server 2022，大家复制的时候看清楚）：

```powershell
Add-WindowsFeature Web-Server,Web-Mgmt-Tools,Web-Mgmt-Console,Web-WebServer,Web-Common-Http,Web-Default-Doc,Web-Static-Content,Web-Performance,Web-Stat-Compression,Web-Dyn-Compression,Web-Security,Web-Filtering,Web-Windows-Auth,Web-App-Dev,Web-Net-Ext45,Web-Asp-Net45,Web-ISAPI-Ext,Web-ISAPI-Filter,Web-Includes,NET-Framework-Features,NET-Framework-45-Features,NET-Framework-Core,NET-Framework-45-Core,NET-HTTP-Activation,NET-Non-HTTP-Activ,NET-WCF-HTTP-Activation45,Windows-Identity-Foundation,Server-Media-Foundation
```

然后等待安装，这一步要的时间比较久，需要耐心等待哦：

![image](assets/image-20251212004314-j5lkavo.png)

完成后应该是这样：

![image](assets/image-20251212005154-35s9psb.png)

然后按照官网说的，还需要安装以下软件：

- [.NET Framework 4.5.2](https://go.microsoft.com/fwlink/p/?LinkId=510096)（没法装，好像系统自带）
- [Visual C++ Redistributable Packages for Visual Studio 2013](https://www.microsoft.com/download/details.aspx?id=40784)（可以装）
- [Visual C++ Redistributable for Visual Studio 2015](https://go.microsoft.com/fwlink/p/?LinkId=620071)（可以装）
- [Microsoft.IdentityModel.Extention.dll](https://go.microsoft.com/fwlink/p/?LinkId=620072)（可以装）

实测第一个没法装，第二个第三个你选 x64 安装就可以，然后第四个可以直接装，这里我就不演示了。

![image](assets/image-20251212010634-d9efmec.png)

#### 10）安装 Office online server

> 特别注意：本操作只能在 Webview 上执行。

这里我是直接改了 Webview 服务器的 ISO 镜像，你可以根据使用 VMware 或者其他平台修改：

![image](assets/image-20251212010111-17kspsf.png)

然后打开电脑就可以看到，或者你自己去下载，或者把 iso 传输进去，按照你喜欢的方式来，反正这个系统双击 iso 的时候是默认装载的镜像的哦：

![image](assets/image-20251212010200-n8juc3j.png)

接受协议，然后继续：

![image](assets/image-20251212010235-2mb32m8.png)

然后默认的继续：

![image](assets/image-20251212010245-angzuju.png)

等待安装完成：

![image](assets/image-20251212010256-h6oooe9.png)

完成：

![image](assets/image-20251212010336-j55d2fg.png)

#### 11）启动 Office online server

然后我们要执行命令，注意这里的 Internal URL 是刚刚我们 Webview 的 Hostname 和创建的新林组合起来的域名：

```powershell
New-OfficeWebAppsFarm -InternalURL "http://webview.ayaka-internal.space" -AllowHttp -EditingEnabled
```

执行效果如下，他会提示你的是否允许编辑，实测并不会要你输入微软密钥或者 License：

![截屏 2025-12-12 01.12.56](assets/截屏2025-12-12%2001.12.56-20251212011258-uv1te27.png)

然后接下来，我们要允许从互联网的 URL 读文件，需要执行下面命令：

```powershell
Set-OfficeWebAppsFarm -OpenFromUrlEnabled
```

然后我们在浏览器里面输入刚刚的域名，就可以看到部署已经成功完成！

![截屏 2025-12-12 01.15.34](assets/截屏2025-12-12%2001.15.34-20251212011536-gbq45yo.png)

到这里已经结束了基本，最后我们还需要去安装 Office Online Server 的语言包，下载地址：[https://www.microsoft.com/zh-cn/download/details.aspx?id=51963](https://www.microsoft.com/zh-cn/download/details.aspx?id=51963)

安装过程和前面的基本一样，我这里就省略了：

![截屏 2025-12-12 01.17.38](assets/截屏2025-12-12%2001.17.38-20251212011741-tieecp1.png)

### 三、调教教程

#### 1）测试预览

虽然安装到前面就结束了，其实还有很多问题。首先是设置一下外网访问地址，以便 FRPC 内网穿透

```powershell
 Set-OfficeWebAppsFarm -ExternalURL https://<你的外网访问地址>

```

然后我建议你在**自己的阿里云 OSS 里面，新建一个 S3 存储**，然后上传一个 Office 文档文件，看看能不能预览，理论是可以的。大家不要直接在互联网随便搜索一个 URL 里面带有 docx 的文件，很有可能打不开，因为 Office Online Server 默认不支持 TLS 1.2 和 1.3 以上的版本！

![截屏 2025-12-12 01.27.40](assets/截屏2025-12-12%2001.27.40-20251212012747-116x6zb.png)

#### 2）开启 TLS 1.2 支持

前面我让大家用阿里云 OSS，就是因为 OSS 这个好像可以支持 TLS 1.0，但是现在网上很多资源都是 TLS 1.2 以上。所以很麻烦。

还是在强调一遍，有些朋友可能接下来会在互联网上面，或者自己的云盘上面找一个直链，然后喂给这个 Office Online Server，但是突然发现没法预览，这个原因是没有开启 TLS 1.2，具体操作：[在 Office Online Server 中启用 TLS 1.1 和 TLS 1.2 支持 - Office Online Server | Microsoft Learn](https://learn.microsoft.com/zh-cn/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server)

将 TLS 1.1 和 TLS 1.2 及更高版本与 Office Online Server 配合使用需要在 .NET Framework 4.5 或更高版本中使用强加密。 若要在 .NET Framework 4.5 或更高版本中启用安全系数高的加密技术，请添加以下注册表项：

```text
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
```

具体搜索**注册表编辑器**：

![image](assets/image-20251212162132-xaj4qxa.png)

打开之后一个个路径找，新建一个 DWORD：

![image](assets/image-20251212162259-i8ytbzb.png)

然后就是把名词和具体的值改成上面列表里面说的。直接值输入 1 然后确定就可以。

```text
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\.NETFramework\\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
```

#### 3）图片剪切板支持

默认 Office Online Server 是不支持图片的粘贴编辑的，需要手动打开，具体参考：

```powershell
Set-OfficeWebAppsFarm -PicturePasteDisabled:$false
```

#### 4）内网穿透功能

去 Github 下载 [Releases · fatedier/frp](https://github.com/fatedier/frp/releases) 的客户端。然后按照网上的教程配置好远程服务器的 FRPS 和 FRPC。这里我有点不是很想再把这个功能炒旧菜炒一遍。

- 去你有公网的服务器上配置好 frps 的服务端（比如暴露在 `http://8.8.8.8:8888`）
- 在 webview 服务器配置 frpc 的客户端，并把配置文件填好

这里给大家一个 **frpc** 的模版（frps 大家自己搭建吧）

```ini
[common]
server_addr = 8.8.8.8 ;填写你frps服务器 IP
server_port = 7000    ;填写你frps服务器的运行端口，一般是 7000
token = xxxxx         ;这个保密，如果你frps开启了token认证

[webview]
type = tcp
local_ip = webview.ayaka-internal.space
local_port = 80
remote_port = 8888     ; 填一个远程服务器没有用到的端口
```

然后我们要修改配置，内网穿透必备选项，把 SSL offlod 打开，卸载到 Nginx 或者负载均衡：

```powershell
Set-OfficeWebAppsFarm -SSLOffloaded:$true
```

然后把你的 InternalURL 和 External URL 全部设置为外网访问的 URL（可以是 Https）。其实上面那个步骤做完之后你将无法从 InternalURL 访问到你的 Office Online Server 了！

```text
Set-OfficeWebAppsFarm -InternalURL https://<你的外网访问域名>
```

然后在你的 Windows 上面启动 FRPC 客户端。之后我们回到 FRPS 服务器，我们配置 Nginx：

```conf
server {
    listen 443 ssl;
    server_name <你的外网访问域名>;

    ssl_certificate <证书路径自己改>;
    ssl_certificate_key <证书路径自己改>;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    client_max_body_size 0;

    location / {
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;

        proxy_pass http://<你的外网访问域名>:8888;
    }

}

#http forced jump https http强制跳转https配置
server{
    listen 80;
    server_name <你的外网访问域名>;
    rewrite ^(.*)$  https://<你的外网访问域名>;
    location ~ / {
    index index.html index.php index.htm;
    }
}
```

#### 5）允许出站 Http

没什么好说的，如果你需要你的 OOS 访问一些 http 资源，就把这个打开。

```powershell
Set-OfficeWebAppsFarm -AllowOutboundHttp:$true
```

#### 6）集成 Nextcloud 部署

这部分我就简单写写吧，参考官网 [nextcloud/docker: ⛴ Docker image of Nextcloud](https://github.com/nextcloud/docker)：记得自己指定密码变量 `MYSQL_ROOT_PASSWORD`​ 和 `MYSQL_PASSWORD`

```yaml
services:
  # Note: MariaDB is external service. You can find more information about the configuration here:
  # https://hub.docker.com/_/mariadb
  db:
    # Note: Check the recommend version here: https://docs.nextcloud.com/server/latest/admin_manual/installation/system_requirements.html#server
    image: mariadb:lts
    restart: always
    command: --transaction-isolation=READ-COMMITTED
    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=
      - MYSQL_PASSWORD=
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  # Note: Redis is an external service. You can find more information about the configuration here:
  # https://hub.docker.com/_/redis
  redis:
    image: redis:alpine
    restart: always

  app:
    image: nextcloud
    restart: always
    ports:
      - 8080:80
    depends_on:
      - redis
      - db
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_PASSWORD=
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db

volumes:
  nextcloud:
  db:
```

然后打开 Nextcloud，在右边的应用里面进入：

![image](assets/image-20251212164158-w6o9lvu.png)

然后在这里安装：

![image](assets/image-20251212164453-sat99h9.png)

安装好之后，在这里输入你的 Office Online 的地址，最好是带 https 的：

![image](assets/image-20251212164418-wnkar21.png)

然后你就可以在预览里面看到你的 Office 文件了，随便上传打开一个文件：

![image](assets/image-20251212164652-jfmflrb.png)
