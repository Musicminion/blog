---
title: Git学习 | 第一章 起步
tags: [Git, 学习, 笔记, 专辑]
date: 2024-01-23 23:00:00
updated: 2024-01-24 00:06:00
index_img: 2024/01/Learn-Git-Chapter01/snapshots.png
banner_img: 2024/01/Learn-Git-Chapter01/snapshots.png
author: Musicminion
---

## Git学习|第一章 起步

> 由于我马上就要考研复试，一看水源那些转专业的，**似乎都被问到了git**，整得我非常慌。本来我自己的git学的半瓢水（没学过，从来都是用图形界面），而且我自己一般都是个人开发，很少用到那种冲突合并，用git版本管理单纯就是留一条后路（逃）真正回退什么的到不多，所以打算开始更新博客的小专题，**Git学习**。内容参考了[Git - Book (git-scm.com)](https://git-scm.com/book/zh/v2)。希望可以坚持下去。

### 一、几种版本控制

这个其实软工原理课程里面就学过了版本管理，有三种：

- 本地版本控制系统（文件名加上v1、v2；[RCS](https://www.gnu.org/software/rcs/)）
- 集中化的版本控制系统（ICS课里面Lab用的svn）：每个人从服务器拉取最新，然后提交。缺点是中央服务器的单点故障。 
- 分布式版本控制系统（Git）每个人本地都有一份副本，更靠谱。Github、Gitlab等其他

### 二、git存储的原理

> 很多人看github上面，那绿色代表添加的行啊，红色代表删除的行，就认为git是用的增量保存，大错特错。

Git 是把数据看作是对小型文件系统的**一系列快照**，而**不是增量保存**！这是必须要搞明白的。比如，下图就是增量保存：

![存储每个文件与初始版本的差异。](./deltas.png)

而git用的方法是：

![snapshots](./snapshots.png)

Git有一些很好的特性：

- 绝大多数操作都只需要访问**本地**文件和资源，不需要连网，本地磁盘上就有项目的完整历史，所以大部分操作看起来瞬间完成。这也意味着你在离线或者没有 VPN 时，几乎可以进行任何操作。
-  Git 保证完整性，Git 中所有的数据在存储前都计算**校验和(Sha1)**，然后以校验和来引用。这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。这个**在底层实现**，若你在传送过程中**丢失信息或损坏文件 **，Git 就能发现。
- Git 一般只添加数据：你执行的 Git 操作，几乎只往 Git 数据库中 **添加** 数据。只要你提交了， 就难以再丢失数据

> Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来。 SHA-1 哈希看起来是这样：
>
> ```
> 24b9da6552252987aa493b52f8696cd6d3b00373
> ```

### 三、Git的三种状态

【重点】Git 有三种状态，你的文件可能处于其中之一： **已提交（committed）**、**已修改（modified）** 和 **已暂存（staged）**。

- 已修改表示修改了文件，但还没保存到数据库中。
- 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- 已提交表示数据已经安全地保存在本地数据库中。

![areas](./areas.png)

如上图

- 在最左边的work directory改了文件，文件就是已修改状态
- 然后我可以通过把文件添加到暂存区，**暂存区是一个文件**，**保存了下次将要提交的文件列表信息**，一般在 Git 仓库目录中。 按照 Git 的术语叫做“索引”，不过一般说法还是叫“暂存区”。
- 然后我可以通过`git commit`，把暂存区的文件提交，这就提交到本地的仓库了，后面就是`git push`推送到远程的修改。

### 四、配置git

> 我知道很多人都讨厌配置git认证...我自己也是。

#### 1）Git config

Git 自带一个 `git config` 的工具来配置，实际上配置有三个地方存储了，优先级从低到高是：

- `/etc/gitconfig` 文件: 系统级全局配置。 如果在执行 `git config` 时带上 `--system` 选项，那么它就会读写该文件中的配置变量。 （要管理员改）
- `~/.gitconfig` 或 `~/.config/git/config` 文件：用户级别的配置文件。 你可以传递 `--global` 选项让 Git 读写此文件，这会对你系统上 **所有** 的仓库生效。
- 当前使用仓库的 Git 目录中的 `config` 文件（即 `.git/config`）：针对该特定仓库。 你可以传递 `--local` 选项让 Git 强制读写此文件，虽然默认情况下用的就是它。 （当然，你需要进入某个 Git 仓库中才能让该选项生效。）

如果出现冲突，以上面列表的后面的为主！

#### 2）用户信息

安装完 Git 之后，要做的**第一件事**就是**设置你的用户名和邮件地址**。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```console
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

我知道很多小朋友这里问号非常多：

- 【问题】为啥要配user name，user email，这个是用来认证的吗？配置后能不能登录github？
- 【回答】**不是用来认证的**，这个是用来显示，比如你`git commit`之后，然后查看`git log`，里面要查看**是谁提交的，邮件是什么**？与认证无关！
- 【问题】我能不能冒充别人？配一个别人的username？别人的user mail？
- 【回答】可以，但是会有其他方式发现。如果你写错了这个mail，或者故意用了别人的mail，那么在github上面，你可能看不到自己的提交，或者看到的提交头像是别人的。所以没有这个必要，我们相信大家都是好孩子。
- 【问题】`user.name`是否需要与github的用户名一样？
- 【回答】不需要，它和你的Github用户名没关系就行。真正用来关联的是邮件地址！
- 【问题】这个和github用来登录的email，一定要一样吗？
- 【回答】不需要一定一样，假如不一样，你一样可以推送啊、提交什么的，都没有问题。唯独就会导致github显示不出来你提交的头像、用户名什么的，所以**推荐设置成一样的**，最好设置为后面那种noreply的那种，更靠谱
- 【问题】有时候我看到github的提交邮箱是`@users.noreply.github.com`这样的，怎么回事？
- 【回答】github用这个邮箱，代替你的commit的email，这样更能够保护你的隐私。推荐设置为**基于ID的GitHub-provided noreply地址**，作为`git config`的邮箱，因为一旦想在Github账号删除一个邮箱，与该邮箱关联的贡献会消失得无影无踪。
