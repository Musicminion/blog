---
title: 笔记分享 | CSE 之 inode文件系统
tags: [inode, 文件系统, 学习, 笔记]
date: 2024-01-24 10:16:00
updated: 2024-01-24 10:16:00
index_img: 2024/01/Notes-CSE-inode-fs/文件系统层次.png
banner_img: 2024/01/Notes-CSE-inode-fs/文件系统层次.png
author: Musicminion
---

> 文件系统一直是一个很重要的话题。我大二下学期的生物专业课《Linux》就提到过文件系统、inode，可惜当时学的云里雾里，加上没有考试所以就只能说勉强一知半解。如今在CSE的课程加持下，把inode相关的文件系统分解成7层来进行学习，这篇笔记正好用来分享一下inode相关的知识。

## 第三章 inode文件系统

> 现在开始我们的这个正式的这个技术方面，系统方面的这个教学。我们说这门课是有两个维度，一个维度是以系统作为维度，还有一个维度是以属性作为维度。属性包括了可扩展性，包括了安全性，包括了容错性，包括了一致性、原子性，还有是这个可信性等等，这些是不同的系统都会有类似的这样一个属性的这样一个需求，无论是我们的一个简单的一个 Web Server 到 DATABASE 到一个文件系统，一直到哪怕是这个大模型的这个training。

> 一些工程师认为大学里面你们最好能够学一些系统底层系统方面的这个内容。比如说一个大规模的系统到底该如何组织？出了错误之后该如何去检测，如何去预防，如何去容忍？然后发现这些问题的话，正好就是我们在这个 CSE 的时候所需要或者说所会讲的一些内容。

> OpenAI 底层用的是什么基础设施？分布式人工智能框架 Ray。它跟我们这门课会讲的这个 graph 很像，就是把一个这个大模型的这个整个任务的话抽象成一个graph，抽象成一个图，这个Ray和我们课上讲的这个 graph 的这个图计算的话，非常类似。

### 一、文件

下面的是我们的课程图，今天我们要讲的在右下角的File Image。

![架构图](./架构图.png)

#### 1）定义

什么是文件？文件是一种抽象，如果我们要去做一个定义什么是文件的话，有文件的两个根本性的特点：

- 第一个叫做durable-持久性，当我们一个一块数据，它不是持久性的，比如内存里面的临时变量，那就不是文件
- 第二个就是它有一个name-名字，命名这件事情在计算机系统里面是如此的重要，以至于我们会单独的去讲这个命名的方式

它的这个抽象的话，其实比内存的这个抽象要更高一些，对吧？我们也可以说任何东西都是一串字符流都是一串这个 bit stream。我们也可以说这是一个抽象，但一个 Bitstream 如果它不是，就是它没有一个name，那它就不是一个文件。

对于系统来说的话，通常会用底层来自硬件层的一些模块去组成，去实现一个文件

- 所使用的机制的话，就是这个分治法Divide-and-conquer
- 同时它还要让用户能够用一个比较简单的方式把这个文件把它给记住

#### 2）蓝图

大的蓝图如下图所示：

- 硬件方面，我们有内存、Disk
- 软件方面，文件系统和Disk Driver
- ICS里面我们有一些`Read`、`Write`、`Open`之类的接口很熟悉（当然还有`fRead`，对应的是有Buffer的）这就是User和Kernel之间，通过系统调用的方法
- Kernel和Hardware之间，也是通过Read、Write调用。Disk假设是 4TB，对应$2^{30} \times 4KB$
- 一个Page的大小为4KB， arm 里面有一种 64K 页，页分的还更细一些。如果一旦把内存分成 64K 之后，发现整个系统就崩了，为什么呢？因为磁盘是4K，这两必须要匹配得上。除非你把磁盘的管理也变成相应的做改动，一旦改动之后发现又有更多的一些地方要修改。最终发现性能提高了10%几。

![文件系统层次](./文件系统层次.png)

现在我们的任务就是作为文件系统来说，它需要去管理这个一个billion的 4K 的这样一个block，对上提供 open read right 的接口，当然还有seek，就是移动cursor，FSYNC就是把缓存数据强制 Flash 到磁盘里，这个还有是 change mod，chang own，还有是这个改变目录的，比如mount和unmount。

#### 3）最简单的文件系统

> 如果让我们先来实现一个文件系统的话，给你十亿个block，你会怎么实现一个？最基本最简单的方式，用block的index，就是文件的name。比如说 107 号文件，我就直接找到107。

具体效果如下图：

![最简单文件系统](./最简单文件系统.png)

如果一个文件的大小超过了1Block，我们就往后面存储，那么会有问题？

- 上图里面，假如我要存储**5Block**，怎嘛办？空的只有4Block。
- 请看后面的介绍

### 二、文件系统层次

#### 1）七层文件模型概述

inode文件系统分为七层，如下表格所示：

|      层级      |             用途             |      分类      |
| :------------: | :--------------------------: | :------------: |
|   符号链接层   | 使用符号链接集成多个文件系统 | 面向用户的名字 |
|   绝对路径层   |   为命名层次结构提供根目录   | 面向用户的名字 |
|   文件路径层   |  将文件组织到命名层次结构中  | 面向用户的名字 |
|    文件名层    |    为文件提供面向人的名称    | 机器、用户接口 |
| Inode Number层 |   提供面向机器的名称给文件   | 面向机器的名称 |
|     文件层     |   把若干个Blocks组织成文件   | 面向机器的名称 |
|    Block层     |       识别硬盘的Blocks       | 面向机器的名称 |

#### 2）第一层 Block层

第一层叫做block，其实很简单，就是 disk 有block，然后我传一个 block number 进来，我就应该得到一个对应的 4K 的数据。

| Block num | Disk Block |
| :-------: | :--------: |
|           |            |

对应的函数是：

```c
procedure BLOCK_NUMBER_TO_BLOCK(integer b)-> block
  return devices[b]
```

存在的问题：

- 第一，对于这么大这么多的一个 10 亿个 block 来说，我们怎么知道一 block 的大小是多少？ 4K 还是我们后面会学的？8K？16K？你怎么知道大小多少？
- 第二，你怎么知道哪些 block 是free，没有被用的，这些信息我们叫 Meta data，它就要记录在磁盘上，因为没别的地方可以给你记。
- **（问题一）** 所以我们需要有一些特殊的Block，叫做super block。 super block 通常来说放在磁盘的头部。
- 由于历史的原因，我们一般会在磁盘的第一个 block 上放一些跟启动相关的这个信息，所以我们叫 boot block，后面接着放super block。（这是一种实现，那你说移动硬盘是否可以不需要Boot block，这个也是可以的）

![superblock](./superblock.png)

这里我们就需要有trade off了，block的大小，既不能太大，也不能太小，这是为什么？

- block太大的话，就会带来一个问题，就是会浪费，一个block只能分配给一个文件，一旦分配了，就是给他了。
- block太小的话就会导致你磁盘很碎，对不对？你要去记各种 block number，要记录的信息大大增加。
- **（问题二）** 我们需要记录free的block。有人可能说，我可以用指针，我上一个指向下一个 free list。但是用这种方法的话，我们拍脑袋就能够想出来它效率不是很高。如果我们用一个 free list 这种指针上一个指下一个，再指下一个的这个方式的话，那么每一个 free block 都会对应一个 block number，block number 至少是64Byte，如果说我用指针的话，就意味着我有多少个 free 的 block 就要有多少个对应的 block number，这显然就很浪费，就相当于 4K 我得浪费 64 bit。
- 所以我们索性用一个数组，数组的index代表地址。bitmap，这个 bitmap 就是 0101 的序列， 0 表示这个是不是 FREE，1 表示这个不是free。

![分布图](./分布图.png)

#### 3）第二层 Block Layer

> 当我们已经有能力去标记整个磁盘上哪些块是free，哪些块是 not free 之后，我们就要去考虑文件了，因为文件有可能比一个 block 要大。

怎么才能去标记一个比 4K 大的一个文件呢？我们势必要去记录下，说什么呢？就是这个文件它的数据保存在哪些 block 上。所以我们就引入了一个数据结构叫做 iNODE。这个 i NODE 长什么样？它就是记录了 block 的 numbers 和一个 size。数据结构如下代码。

| File(inode) | Block num | Disk Block |
| :---------: | :-------: | :--------: |
|             |           |            |

```c
// inode的大小是固定的，放不下可以再加
struct inode{
	integer block_nums[N];  // 这个文件它的数据保存在哪些 block 上
	integer size;						// size 它是以 byte 作为粒度的
  // 如果没有size，我就不知道这个文件有多大，读到哪里停止
};
```

inode的大小是固定的，上面的block_nums的数量限制是固定的，那么文件太大了，如果放不下怎嘛办？如下图所示：

- 对于indirect block，它直接指向data，就是存文件的地方
- 对于double indirect block，它指向indirect block，indirect block里面全部用来存储的数组，数组的每个元素都是block index，指向对应的数据
- 对于triple indirect block，它指向double indirect block，同理里面只存储数组，每个元素是double indirect block的index。

![截屏2024-01-23 11.58.46](./inode.png)

练习题：如上图所示，最左边的inode，有6个indirect block，1个double indirect block，1个triple indirect block，能存储多少数据？假设一个Block是4K，Block的index需要8 个byte(64位)来存储？

![截屏2024-01-23 12.12.58](./inode计算.png)

- 首先最左边的inode的6个橘黄色的indirect block，对应6个Block
- 一个double indirect block，对应512个Block
- 一个triple indirect block，对应$512 \times 512$个Block
- 最后求和即可

再来看size的用途，size用来记录文件的大小，因为你没有size，你怎么知道Block里面，哪些是用了的。当我读一个文件的时候，我先判断你读的内容是不是比我的 size 要小，你要读内容比我 size 大了，我就根本不理你了。

这一层需要完成的函数是：

```c
// 给定一个inode和文件偏移量，获取对应的数据所在的block的全部数据
// 这个只考虑了indirect block，至于double都没考虑
procedure INODE_TO_BLOCK(integer offset, inode i)-> block	
	o = offset / BLOCKSIZE  			 // o 计算的是，他在第几个BLOCKSIZE里面
	b = INDEX_TO_BLOCK_NUMBER(i,o) // 根据 o，去i.block_nums[]数组里面找第o个元素
  // b就是在数组里面找出来的，block的index
	return BLOCK_NUMBER_TO_BLOCK(b)
procedure INDEX_TO_BLOCK_NUMBER(inode i, integer index)-> integer
     return i.block_nums[index]
```

下一个问题，inode存储在哪？如下所示，放在bitmap后面，再次强调inode table是固定的。

![inode存储位置](./inode存储位置.png)

#### 4）第三层 inode Number Layer

> inode排列起来，自然就有了顺序，为啥它就是个层次关系？为什么？因为它要有一个name，本来一个 i node 的是没有 name 的，它就是一块数据，现在我给他一个number，它就有了name，一旦有了name，就有很多好玩的事情就出现了。一旦排在一个 table 里面，它就有顺序了， 1 号、 2 号、 3 号、 4 号，我就可以根据这个它的在 table 里面的位置去找到这个inode内容是多少。

到了inode位置，对于一个机器来说的话，它就已经是完备的了，就是这个机器它已经可以通过 i node number 去组织所有的文件。因为你所有的文件无非就是一个 i node number。有一个号，给我一个号，我给你一个文件，给我一个号，我给你一个文件。故事到这其实就已经结束了。但是我们人却不满足。为什么？因为我不能跟你说。唉，你给我把那个 36785126 号文件给我，这个就太复杂了。

- 第一：你根据这个号是可以找到那个文件，OK，是可以找到这个文件，但问题是这个名字太复杂了
- 第二，当你把这个文件从这台机器 copy 到另外一台机器的时候，它的 inode number 就变了
- 所以我们需要一个 user friendly name，比如`a.txt`

#### 5）第四层 文件名层

文件名，这一层是建立在 i node 的 number 这一层之上的。从这个意义来说，它是从一个字符串映射到了一个inode Number算法。既然我们要映射，那么我们就需要去有一个数据结构去做这个映射，这个数据结构长什么样子？如下所示

| File  name | inode num |
| :------------: | :---------------: |
| helloworld.txt |        12         |
|   cse2024.md   |        73         |

这个数据结构保存在一个特殊的文件里面，这个特殊的文件叫做directory，也就是目录。它是字符串到一个数字的映射。这个就是我每次要吐槽一下这个 Windows ，Windows 里面把目录叫做文件夹，这个翻译其实并不准确。为什么？目录成了文件夹，那文件夹是个啥呢？目录，你看它内部存的就是目录。我们有人会把书前几页叫做文件夹吗？

目录本身也是一个文件，这就是我们前面有同学说的 everything is a file，一切都是文件。目录建立在我们前面所说的这个层次结构之上，它也有 inode 的。所以现在我们的inde要加上`type`了。0 表示普通文件，1表示目录。

```c
struct inode{
	integer block_nums[N];
  integer size;
  integer type;
};
```

下一个问题就是，文件名字太长了怎嘛办？上面的哪个`File  name`的表格，比如`helloworld.txt`，这种长度一般都是固定的吧！在 Unix 的第六版里面，文件名的长度就是就固定的，就 14 个byte，你不能再长了。那你说我们今天文件名可以很长，可以多长？

Windows 里面还是有一个叫 8.3 的这个命名方式， 8.3 大家知道什么意思吗？就是 hello 点txt，为什么它是txt不是text？因为点后面只能有三个字母，那有人说现在不是docx吗？那是现代windows支持了。

在一个目录里面，我们要去支持一个函数 look up。 就是你给我一个文件名，再给我一个目录（本质inode Number），我返回给你一个该目录下，名字叫做filename的inode Number的值（类型int）

```c
procedure LOOKUP(string filename, integer dir)-> integer
   block b
   inode i = INODE_NUMBER_TO_INODE(dir)
   // 如果不是目录，报错
   if i.type != DIRECTORY then return FAIURE
   // 遍历这个表格，查找对应的文件名
   for offset from 0 to i.size – 1 do
         b <- INODE_NUMBER_TO_BLOCK(offset, dir) 
         if STRING_MATCH(filename, b) then 
            return INODE_NUMBER(filename, b)
        offset <- offset + BLOCKSIZSE
   return FAILURE 
```

到目前为止，我们相当于是整台电脑只有一层目录。那你不能重名！最后用起来一定是非常非常的麻烦的。于是又产生了一个叫做 path name layer。

#### 6）第五层 Path name 层

当我遇到一个`projects/paper`的路径的时候，我需要实现的是一个 path to inode number

- 我先去这个当前的 DIR 里面去找这个 path 里面的第一层
- 找到之后我就重新进一步的去找这个第二层，就是一个递归

```c
procedure PATH_TO_INODE_NUMBER(string path, integer dir)-> integer
     if PLAIN_NAME(path)return NAME_TO_INODE_NUMBER(path,dir)
     else 
         dir <- LOOKUP(FIRST(path), dir)
         path <- REST(path)
         return PATH_TO_INODE_NUMBER(path,dir)
// Context: the working directory dir 当前工作目录
```

#### 7）Link

我就问大家一个问题，文件名是不是文件的一部分？不是！一个文件包含哪些？block number，还有type，还有size，文件名在 i node 里面吗？在文件的数据段里面吗？不在！ i node 的里面最有意思的一个点就是文件名和文件是没有关系的。

那我们可以干什么？我让ab的两个txt文件都指向同一个inode。你说，哼，这有啥意义？ make no sense 就完全没用。

| File  name | inode num |
| :--------: | :-------: |
|   a.txt    |    12     |
|   b.txt    |    12     |

但是假设我有一个，假设我有一个很长的文件，对吧？比如说我有一个很长的文件叫 `mail/inbox/assignment`，有很长的名字，然后我每次都要输好久，我觉得好烦啊，就这样说好久，然后你就可以给他重新命名一下，然后你就可以给他重新命名一下，在当前目录下，你可以说我叫一个assignment，这样可以简化。

这样我们就明白新建文件的本质，就是在这个 directory 里面新加了一行，这一行后面所对应的这个inode num，可以是已有的，也可以是全新的。

同样的道理，我们可以unlink，就是类比把上面的表格`b.txt`这一行全部干掉，但是inode还在啊，你还是可以通过`a.txt`访问的！那我再删掉a，那这时候inode怎么回收？我们因此又需要一个新的变量：`reference counter`。表示我这个 i node 的当前有多少个名字指向它。像我每当我删掉它一个名字的时候， reference counter 就会减一，删掉一个就会减一。当这个 reference counter 减到 0 的时候，释放这个inode。

下一个问题，目录能不能够有link？既然文件可以用 link 给它加一个 reference counter，可以有两个名字，那么目录可以吗？可以！但是我们在系统里面却不允许或者禁止掉了对目录加link。**原因就是对于目录加link，很容易导致循环。**

如下图所示

- x是根目录，a是个目录，b也是个目录
- 25代表文件a的inode number，右边的1代表的是ref cnt。
- 现在如果我给b目录link到了a，ref cnt变成了2，那么我如果直接把a目录删除了，会发生什么？
- 一种情况，ref cnt从2变成1，但是a以下的目录全被删了，从此这个inode永久就无法被删除
- 另外一种情况，如果一个目录下面有文件或者目录，我不允许删除，但是这样也没有用，因为：
  - a下面有目录b，删不了
  - b下面有目录c，删不了
  - c本质就是a，下面也有东西，更删不了
  - 这下导致abc都无法删除了！

![循环删除](./循环删除.png)

> 但是并不是所有的目录都不能link，考试的时候，我说现在操作系统里面不允许给一个目录建link，这句话对不对？错误！

为什么？你可以执行`ls -a`就会发现，有两个特殊的link，叫做`.`和`..`，这两个分别对应当前目录、上级目录。本质就是link到了对应的inode哦！

```bash
admin@192 ~ % ls -a
.  ..  file1 file2
```

我自己还试了一下能不能把这两个文件`.`和`..`删掉，不行！很遗憾。这种`.`开头的文件，会被linux默认隐藏，所以必须要用`ls -a`才能完整的显示出来。

接下来我们再来看rename，rename 就是我们也很熟悉，无非就是把文件名 a 点 txt 改成 b 点txt，稍微 rename 一下。但这个 rename 是文件系统里面最复杂的一个操作！这个 rename 是如此复杂，以至于我们实验室都为他写了好几篇顶会论文了。如果根据刚才我们的描述，让你去实现rename，你该怎么实现？现在假设我要把这个文件`.a.txt.swp`, 把 `.a.txt.swp`改成 `a.txt`。这实际上是个`swap`文件它是记录了你当前 VI 里面编辑但还没有保存的那个文件。一旦当你这个机 crash 掉之后，你重新回来，你最近一次编辑大概率是会保存在这个点 swp 文件里面的。

当你在 `vim` 里面运行冒号 w 的时候，它就会做一个这个rename，就把 `.a.txt.swp`改成 `a.txt`。让你去实现这个 rename 的过程，你会怎么做？一般是下面三个步骤：

- 看看有没有一个叫`a.txt`的文件，如果有的话你就把它删了
- 建立一个从`a.txt`这个字符串到点`.a.txt.swp`对应的 inode 的这样一个目录项目。这时候这个时候这个文件就有两个名字了
- 第三步，把原来这个`.a.txt.swp`删掉

但这个有一个问题，就是如果在第一步和第二步之间，你电脑重启了，你会看到的是什么？你会发现`a.txt`这个文件突然没了，你本来编辑的好好的，突然发现这个文件没了，这你是不是瞬间生气了。

所以在现在操作系统里面，就必须要把这个 link from name 和 to name 把它合并在一个地方，不能够是分开的（就是上面说的第一步、第二步之间）。

#### 8）第六层 绝对地址层

抽象层次如下图：

|               |           |             |           |            |
| :-----------: | :-------: | :---------: | :-------: | :--------: |
| Absolute path | File name | File(inode) | Block num | Disk Block |
|   Path name   |           |             |           |            |

早期的时候，一个服务器，每个人登录上去看到的是不一样的东西，文件共享变的非常困难。最后产生了一个想法，就是说干脆我们所有的人有一个共享的一个根目录，比如我们有`home`目录，每个人有自己的目录。那么对于根目录`/`来说，它就是所谓的根，就是已经不能再往上走了，所以他的点和点点都是指向他自己，就是我们说的根目录。

#### 9）一个例子

如下图所示，怎么找到一个文件`/programs/pong.c`

![一个例子](./一个例子.png)

- 你这个程序应该先看哪？`/`，因为他代表根目录，所以我们要找inode table
- inode table的位置？super block！super block会告诉你inode table在哪。
- inode table的第一个inode，就是根目录！这是我们规定的
- 一个inode差不多1K左右，所以一个Block大小4K，可以存放四个
-  根据root inode，发现数据是`14 37 16`，`14`对应的是block number
- 然后找到block14，发现是个**目录**，找program，右边对应的是7，7是inode number！
- 去inode 7，找到发现23，是block number，然后发现23是一个目录，里面有`pong.c`，对应的9是inode
- 去inode 9，发现61，是block number，block 61对应的是文件的内容！

#### 10）另外一个例子

这个例子非常关键。先看代码，我们可以用`-ai`，`-a`代表all，`-i`表示打印出来inode。可以看到我们这个文件夹，里面有a、b、c、d四个文件！然后我们用debugfs来看。

```bash
$ ls -ai temp
7536909 .  7530417 ..  7536939 a  7536940 b  7536941 c  7536942 d

$ echo “obase=16;7536909;7530417;7536939;7536940;7536941;7536942" | bc
73010D  72E7B1  73012B  73012C  73012D  73012E

$ sudo /sbin/debugfs /dev/sda1
debugfs 1.43.4 (31-Jan-2017)
debugfs:  dump temp temp.out
debugfs:  quit

$ xxd temp.out
0000000: 0d01 7300 0c00 0102 2e00 0000 b1e7 7200  ..s...........r.
0000010: 0c00 0202 2e2e 0000 2b01 7300 0c00 0101  ........+.s.....
0000020: 6100 0000 2c01 7300 0c00 0101 6200 0000  a...,.s.....b...
0000030: 2d01 7300 0c00 0101 6300 0000 2e01 7300  -.s.....c.....s.
0000040: c40f 0101 6400 0000 0000 0000 0000 0000  ....d...........
0000050: ...
```

直接看你肯定很懵逼，看下面的图，首先ext4文件系统的结构是：

```c
struct ext4_dir_entry {
  uint32_t inode_number;
  uint16_t dir_entry_length;
  uint8_t  file_name_length;
  uint8_t  file_type;
  char     name[EXT4_NAME_LEN];
}
```

- 为什么是`0d01 7300`，因为ics我们学过，是little Endian！实际上表示的数据是`73010D `
- 蓝色的部分是0c00，表示的是`dir_entry`的长度，因为我们这里的文件名都太短了，所以这里是12，12代表是12个byte，如下表所示有六列，每列都是两个byte。
- 灰色的是01，代表文件的名字的长度，单位是byte，就是多少个char
- 金色的是02，代表文件类型，比如目录啊、普通文件什么的
- 最后一个就是字符数组，表示长度，显然那个`2e2e`的就是`..`，`2e`就是一个`.`
- 有个小细节：为什么是`c40f`，最后一行的数据，因为`c40f`本质就是`0fc4`，加上前面的五个`0c`也就是5*12=60，那就是3C
- 然后`3c`+`0fc4`结果0x10000，就是整个的大小$2^{16}$，正好一个entry的大小。也就是可以说，最后一个entry，相当于把整个剩余的部分全都包了
- 补充：字符串没有little endian。
- 在这里我们可以看到它是支持长文件名的，为什么？因为它这有一个这个 file name lens

![目录条目](./目录条目.png)

#### 11）第七层 Symbolic Link Layer

hard link 是有局限性。 hard link 的一个非常大的局限性在于说当你插了一个 u 盘进来之后，你是没有办法建立起一个从你的根部路到这个 u 盘里面的一个文件的，hard link。

为什么？我再说一遍，当你在你的主机上插入一个 u 盘，对吧？这个 u 盘你一般会从哪去访问？在`dev`？不不，`/mnt/usb01`什么什么的，实际上来说是把`dev`映射到了这个`mnt`上面，这个我们先不care。现在你插了个 u 盘进去之后，我下面有`1.txt`，我能不能link一下？不行，inode不对，因为u盘有u盘自己的inode，这是两套东西！那么我们怎么才能够让这个不行变成行呢？我们就会提出这个synbolic link。

符号链接是什么？举例子

- 我首先创建一个符号链接，把当前文件夹下面的`s-link`链接到`/tmp/abc`
- 注意，`/tmp/abc`这个文件并不存在！但是也可以链接
- 然后我用`readlink`的方法，看看链接到的是什么
- 然后我用`cat s-link`，发现文件不存在？为什么？操作系统读取s-link文件，发现是符号链接，然后读取`/tmp/abc`，发现这文件不存在，报错
- 然后我`echo`到`/tmp/abc`，创建了这个`/tmp/abc`文件
-  `cat s-link`之后发现可以看到这个文件了！
- 补一句，为什么文件大小是8？思考？`/tmp/abc`正好是8个字符，相当于说这个文件存了个路径

```bash
$ ln -s "/tmp/abc" s-link

$ ls –l s-link
7536945 lrwxrwxrwx 1 xiayubin 8 Sep 20 08:01 s-link -> /tmp/abc

$ readlink s-link
/tmp/abc

$ cat s-link
cat: slink: No such file or directory

$ echo "hello, world" > /tmp/abc

$ cat s-link
hello, world
```

#### 12）小结符号链接

如下图所示，思考一下`my-hard-link`和`myfile.txt`的区别？

- 有人认为他们的地位不一样，前者是链接，后者是文件，错！他们两地位是一样的！并没有所谓的文件名和一个什么链接名没有的，每一个文件名都是链接名。
- 如果我有一个soft link，那就他指向文件，再指向真正的inode
- 这是 hard link 和 soft link 它的一个区别。
- 前面我们说link，早期就只有link，后来出现了soft link也叫符号链接之后，我们就有把前面的link叫做hard link，现在后面的符号链接叫做软链接

![软硬链接](./软硬链接.png)

举个有趣的例子：我们创建一个soft link，如下所示

```
"/CSE-web" -> "/Scholarly/programs/www"
```

然后执行：

```bash
cd CSE-web
cd ..
```

会发生什么？现在的`pwd`是在哪？答案是`/`，而不是`/Scholarly/programs`，这个看上去很奇怪。这里点点就被 bash 劫持了哈？被 Bash 劫持了，这个过程并没有读磁盘，他想要变得更加的 human friendly 一下。你看你本来在根目录，然后你进入到`CSE-web `，再返回`..`不就是`/`！所以这个如果你真的想进入到这个点，你就可以用 `cd -p` ，那就是`physical directory structure`，而不是一些别的东西。

小结一下今天我们上课的一个内容，就是文件系统是如何通过 7 层去构建出从一个文件名，从一个目录，一层一层到一个磁盘的过程的。在这节课里面有几个非常重要的概念，我们再重新回顾一下。

- 文件名不是文件的一部分，这点我怎么强调都不为过
- 所有的hard link都是等价的，并不存在谁先谁后，因为都是建立在inode基础上
- 第三个问题， directory 的 size 是很小的，目录大小和他保存的文件没有关系。就好像我们有一本书写了 10 章，那他的目录就这么点？我们有一本书很薄，但他写了 100 章，他的目录就很厚。directory的大小取决于文件的数量，文件名长短等等，而不是具体存的文件的大小。
- 文件夹你感觉就是文件越多，我这个文件夹越大，对不对？但其实目录这个词更准确，所以大家以后想的时候一定要用我们的书的目录去思考