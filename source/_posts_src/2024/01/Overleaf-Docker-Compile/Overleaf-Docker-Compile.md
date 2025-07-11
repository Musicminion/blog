---
title: Overleaf Docker编译复现计划
tags: [Overleaf, Latex, Docker, 开发]
date: 2024-01-16 19:00:00
updated: 2024-01-27 22:02:00
index_img: 2024/01/Overleaf-Docker-Compile/效果图.png
banner_img: 2024/01/Overleaf-Docker-Compile/效果图.png
author: Musicminion
typora-root-url: ./Overleaf-Docker-Compile
---


## Overleaf Docker编译复现计划

![效果图](效果图.png)

> Overleaf Pro可以支持不同年份的Latex镜像自由选择编译，这实在是一个让人看了心痒痒的功能。但是很抱歉，这属于Pro付费功能。但是我研究了一下，发现其实和Docker编译相关的代码，社区版的很多代码都没有被**Overleaf**删完。这就给我们复现提供了可能。甚至可以说只要配好了环境变量，略微修改就可以用啦！

### 一、需要改动的代码

Overleaf本质是一个微服务的例子，所有的微服务都在`services`文件夹里面。要实现Overleaf Docker编译复现计划，理论上需要改动

- `clsi`是负责编译的微服务，他的全程是：`Common LaTeX Service Interface (CLSI)`
- `web`是前端的服务，也负责后端的服务（这是一个很不好的例子，大概来说是GET服务拉前端页面，POST就是后端的API）
  - 其余的微服务比如Realtime就是用来实时显示编辑者的活动，关系不大，感兴趣的自行研究
- 然后就是搭建者自己要设置好环境变量
  - 有哪些是允许用户使用的Latex镜像
  - 是否开启容器编译


> 再来说说编译过程是怎么样的：
>
> - 用户在前端点编译按钮
> - 后端`web`微服务进程获取用户的编译设置（从数据库?或者什么来源）、发送请求给`clsi`微服务处理
> - 具体的编译过程可以看`clsi`微服务的`Readme`文档，还算比较详细
> - 然后`clsi`根据环境变量，选择是在本地shell执行，还是另外启动一个`Docker`编译
>   - 如果在本地shell执行，那么需要在`sharelatex`下载好Texlive
>   - 如果在容器中执行，会创建一个新的容器，把编译的临时文件夹挂载到这个新的容器
>   - 容器执行完之后退出，`gc`垃圾回收需要容器里面的`cron`定期删除

这里补充一句，Overleaf社区版的本质就是把一堆微服务全部跑在一个容器Sharelatex里面，所以为什么学校的Overleaf隔一段时间就可能爆炸，大概率就是编译某个项目卡死了、人多了或者什么原因，这也足以看出Overleaf的刀法。

#### 1）环境变量

首先要让用户在前端能够看到容器镜像的选择列表，追踪前端的镜像选择的下拉栏目的标签，翻译后一路追踪，发现`web/config/settings.defaults.js`中的文件，还有`clsi`的`setting`总结一下环境变量，大概有这些：

```js
// ###########################################################################
// 下面的是clsi微服务的配置选项
DOCKER_RUNNER = true    # 是否开启Docker编译
TEXLIVE_IMAGE = ""      # 默认的texlive的镜像
												# 如果没设置，则为 quay.io/sharelatex/texlive-full:2017.1
TEXLIVE_IMAGE_USER = (默认是tex) # 到时候根据
COMPILE_GROUP_DOCKER_CONFIGS 
    // compileGroupDockerConfigs = {
    //    priority: { 'HostConfig.CpuShares': 100 }
    //    beta: { 'dotted.path.here', 'value'}
    // }
APPARMOR_PROFILE = 不知道? // 没看出来干什么的

// 可以用的编译镜像，用空格分割开来！
ALLOWED_IMAGES = texlive/texlive-full:2024 texlive/texlive-full:2023
// 对应的代码
  if (process.env.ALLOWED_IMAGES) {
    try {
      module.exports.clsi.docker.allowedImages =
        process.env.ALLOWED_IMAGES.split(' ')
    } catch (error) {
      console.error(error, 'could not apply allowed images setting')
      process.exit(1)
    }
  }

// 这个还是clsi的环境变量
COMPILES_HOST_DIR = (似乎已经废弃? )
// 如果 SANDBOXED_COMPILES_SIBLING_CONTAINERS == true
// 就会用兄弟容器来跑沙箱编译? 然后执行下面的
// 我至今没懂什么兄弟容器是什么意思，好怪，可能就是个自己起的名词罢了
// settings.path.sandboxedCompilesHostDir = process.env.SANDBOXED_COMPILES_HOST_DIR
SYNCTEX_BIN_HOST_PATH = (目前没看到使用这个变量的地方，可能相关代码被删了)

// ###########################################################################
// Web容器要配置下面的东西 
SANDBOXED_COMPILES = "true"
TEX_LIVE_DOCKER_IMAGE = 默认的镜像？
COMPILER_PATH
SANDBOXED_COMPILES_HOST_DIR
SANDBOXED_COMPILES_SIBLING_CONTAINERS = "true"

// 最后：
// 注意把宿主机的docker的sock文件挂载进去
// socketPath: '/var/run/.sock',
```

#### 2）Web部分要改的内容

这是被隐藏的image-name选择栏目对应的tsx文件

```
services/web/frontend/js/features/editor-left-menu/components/settings/settings-image-name.tsx
```

具体内容：

```js
export default function SettingsImageName() {
  const { t } = useTranslation()
  const { imageName, setImageName } = useProjectSettingsContext()

  const allowedImageNames = getMeta('ol-allowedImageNames') as
    | AllowedImageName[]
    | undefined

  const options: Array<Option> = useMemo(
    () =>
      allowedImageNames?.map(({ imageName, imageDesc }) => ({
        value: imageName,
        label: imageDesc,
      })) ?? [],
    [allowedImageNames]
  )

  if ((allowedImageNames?.length ?? 0) === 0) {
    return null
  }

  return (
    <SettingsMenuSelect
      onChange={setImageName}
      value={imageName}
      options={options}
      label={t('tex_live_version')}
      name="imageName"
    />
  )
}
```

然后找这个标签的来源：

```
meta(name="ol-allowedImageNames" data-type="json" content=allowedImageNames)
```

定位到：

```js
overleaf/overleaf/services/web/app/src/Features/Project/ProjectController.js
```

继续：

```js
const allowedImageNames = ProjectHelper.getAllowedImagesForUser(user)
```

找到了这个函数的定义：

```js
const Settings = require('@overleaf/settings')

function getAllowedImagesForUser(user) {
  const images = Settings.allowedImageNames || []
  if (user?.alphaProgram) {
    return images
  } else {
    return images.filter(image => !image.alphaOnly)
  }
}
```

这下路被堵住了，我不知道这个`overleaf/setting`包是干什么的。找了一个别的demo，发现就是每个微服务`app`里面的`config`文件里面写的键值对。那我只需要改`web/config`下面的配置就好了。

接下来的问题：`allowedImageNames`怎么写

```json
{
	"alphaOnly": false,
  "imageName": "texlive-full:2022.1"
}

// setting里面还要写：
imageRoot = 'docker-repo/subdir'

// 我是傻逼，应该直接找他的测试目录里面的(我本来直接忽略了测试用例的js)
// 他自己都写好了测试用例，这就是数据格式，不得不说Overleaf啊
// 我真心觉得他就该开源的，整一个闭、开源结合多累，代码删删改改。
// imageDesc估计是用来描述镜像的，很可能是网站前端的展示的选项
imageRoot: 'docker-repo/subdir',
allowedImageNames: [
	{ imageName: 'texlive-0000.0', imageDesc: 'test image 0' },
	{ imageName: 'texlive-1234.5', imageDesc: 'test image 1' },
],

// 再结合一下，完全正确！回顾之前的代码
// label就是用户选择的时候的选项，value是隐藏在背后的值
  const options: Array<Option> = useMemo(
    () =>
      allowedImageNames?.map(({ imageName, imageDesc }) => ({
        value: imageName,
        label: imageDesc,
      })) ?? [],
    [allowedImageNames]
  )
```

那么，用户如果改变了编译的`image`呢？

```js
  // 用户可以通过选择，改变当前project的编译的镜像
	// 根据Overleaf官网测试的，请求参数是 {imageName: "texlive-full:2022.1"}
	setImageName(projectId, imageName, callback) {
    if (!imageName || !Array.isArray(settings.allowedImageNames)) {
      return callback()
    }
    imageName = imageName.toLowerCase()
    const isAllowed = settings.allowedImageNames.find(
      allowed => imageName === allowed.imageName
    )
    if (!isAllowed) {
      return callback(new Error(`invalid imageName: ${imageName}`))
    }
    const conditions = { _id: projectId }
    const update = { imageName: settings.imageRoot + '/' + imageName }
    Project.updateOne(conditions, update, {}, callback)
  },
```

### 二、操作开始

> 理论存在，实践开始！用Github Codespace开始整活。

先拉两个镜像用来备选：

```
docker pull ghcr.io/xu-cheng/texlive-full:20240101
docker pull ghcr.io/xu-cheng/texlive-full:20220101
```

> 这里补一句，容器镜像的tag必须要是`2021.1`的格式，因为他代码里面有一个正则表达式匹配的`match`，就是靠`:[年份]`来匹配，然后设置环境变量的，其实我觉得这样好蠢啊，直接默认用容器镜像自带的不就好了吗？难道js的库不支持？没办法，为了能验证，只能自己改tag

然后改`web`容器的`config/setting.default.js`

```
imageRoot:'docker.io/texlive',
allowedImageNames: [
	{ imageName: 'texlive-full:2021.1', imageDesc: 'Tex2021' },
	{ imageName: 'texlive-full:2022.1', imageDesc: 'Tex2022' },
],
```

然后是环境变量配置，`sharelatex`容器配置，我至今把官方`server pro`的配置偷过来了。

> 这里注意，我们一般都是用Overleaf Toolkit安装的，所以他默认有一个`data`文件夹
>
> - `data`文件夹往下，里面的`Sharelatex`，就是放的编译容器的数据
> - 自己对照自己服务器的目录改，除非你用户名也叫`ayaka`
> - `SYNCTEX_BIN_HOST_PATH`这个好像不配也可以，说实话没找到里面哪里用到这个变量了的

```bash
SANDBOXED_COMPILES: "true"
SANDBOXED_COMPILES_SIBLING_CONTAINERS: "true"    #### IMPORTANT
SANDBOXED_COMPILES_HOST_DIR: "/home/ayaka/toolkit/data/sharelatex/data/compiles"  #### IMPORTANT
SYNCTEX_BIN_HOST_PATH: "/home/ayaka/toolkit/data/sharelatex/bin"  #### IMPORTANT
TEX_LIVE_DOCKER_IMAGE: "texlive/texlive:2023.01"
```

配置好docker-Compose文件后，开始在容器里面安装docker（建议你手动一行一行的执行，否则一键粘贴哪里炸了都不知道）安装好之后测试一下`docker -v`

```bash
# Add Docker's official GPG key:
 apt-get update
 apt-get install -y ca-certificates curl gnupg
 install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  gpg --dearmor -o /etc/apt/keyrings/docker.gpg
 chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
   tee /etc/apt/sources.list.d/docker.list > /dev/null
   
apt-get update
  
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

重启容器，因为对`Sharelatex`容器的`js`代码的修改，必须要重启之后，才能生效！

然后就开始测试编译，结果发现错误（我没截屏，只能靠回忆），错误大概是：`www-data`用户不存在？突然想起`clsi`里面启动容器的时候，有一个选项就是`User`，定义的似乎就是`www-data`。

那也就是要把`xu-cheng`的那个镜像，添加上`www-data`的用户就好咯？自己写了一个Dockerfile，然后继续测试编译，发现又报错了`Path`找不到

```js
// 目录 services/clsi/app/js/DockerRunner.js
    // set the path based on the image year
    const match = image.match(/:([0-9]+)\.[0-9]+/)
    const year = match ? match[1] : '2014'
    env.PATH = `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/texlive/${year}/bin/x86_64-linux/`
```

所以你还得进入容器里面看看，tex相关的可执行的目录在哪？然后把这个path改成正确的，我就不多说了，这个跟镜像有关系。

然后就遇到最烦的问题了：权限不够，我记得在那个日志里面找到`Permission Deny`，然后一通查找才知道，要把那个`Latex`编译容器里面的`www-data`的用户的`UID、GID`都设置为`33`，也就是说和`sharelatex`容器里面的`UID/GID`完全一样，才能保证读写顺畅，太离谱了。

一怒之下，爆改Dockerfile

```dockerfile
# 使用方法 docker build
# FROM debian:testing-slim

FROM ghcr.io/xu-cheng/texlive-full:20240101

# Install the shadow package
RUN apk --no-cache add shadow

RUN groupmod -g 340 xfs
RUN usermod -g 340 -u 340 xfs
 
# 添加用户www-data，并将其添加到www-data组
RUN adduser -u 33 -g 33 --disabled-password -G www-data www-data
```

说实话都这么折腾了，还把人家原先是33好的uid、gid给改了，会不会引发别的问题，还不如自己去打一个碟跑Texlive，何苦呢？

> 说实话我还折腾过`Texlive`官方的那个镜像Docker，结果因为Unix内核太老了似乎，导致跑`Xelatex`的时候疯狂报错，说熵不够，随机性搞不定，我说实话也没找到任何资料，只能通过换镜像来解决这个问题了吧。
>
> 如果有人遇到类似的，或许可以参考一下。

### 三、尾声（GC垃圾回收）

> overleaf的程序不会自己删除容器，好傻，还得靠我cron大法手动删除？好吧，收个尾！考验gpt脚本的时候到了。

写的时候记得别把正在跑的容器给删了，那就寄了。

```shell
#!/usr/bin/env bash

set -eux

echo "-------------------------"
echo "Delete container"
echo "-------------------------"

# 获取所有已停止、挂了的容器的ID
stopped_containers=$(docker ps -q -f "status=exited" --filter "status=created" --filter "status=dead")

# 循环遍历每个停止的容器
for container_id in $stopped_containers; do
    # 获取容器名称
    container_name=$(docker inspect --format '{{.Name}}' $container_id)
    
    # 移除名称以"project-"开头的容器
    if [[ $container_name == "/project-"* ]]; then
        echo "Removing container: $container_name"
        docker rm -f $container_id
    fi
done
```

然后记得改cron的配置项

```
# 目录 etc/cron.d
* * * * *    root  /overleaf/cron/delete-docker.sh >> /var/log/sharelatex/cron-delete-projects.log 2>&1
```

反正每分钟删除一次就好了，免得机器上有太多没用的容器。


### 四、我为何放弃了Overleaf二次开发

> 最后一部分我想说说我为什么放弃了Overleaf的二次开发，以及从心而论，我真的不建议大家把二次开发的Overleaf放在生产环境中(比如给学校、实验室)用。

在完成Overleaf的Docker编译之后，我又开始尝试集成git，但是奈何缺失的代码过多，复现出来成本过大，所以几乎无法实现git集成、或者github集成。慢慢的我就决定放弃这个Overleaf的二次开发项目，很多时候二开出来的东西，也就是一时能用，后期代码更新很多都是问题...尤其是生产环境里面有大量的项目，更新很容易出现问题。


后来我在小红书上发现，中科大居然有完整版的Overleaf，这是怎么回事？难道是买了Server Pro？一路谷歌搜索，又意外的发现了一位[大神仙](https://github.com/ertuil)，他完整的复现了几乎所有的Overleaf的付费功能，甚至包括git集成，并给中科大部署了这个完整功能的Overleaf（大概在23年的6月份）当时看完非常惊喜，甚至觉得我要是早几天看到就好了，或许Docker编译我就不需要花这么多时间了。

后来一想，还是觉得问题颇多(而且目前来看，作者自己甚至都不怎么维护那个项目了)，自己做二次开发添加功能，很多类似这样的项目都是经过`fork`然后魔改，最后就慢慢的**不维护、不更新了**。毕竟Overleaf上游的代码更新的太过于频繁、个人的力量太过渺小。如果你魔改的Overleaf出现对数据库格式等进行了修改，在版本更新或者遇到某个数据库需要迁移的版本的时候，很可能出现问题就是更新失败或者更挂了。除非定期Merge上游代码、有专门的开发维护团队、测试，否则这样的很多项目都慢慢的淹没在了github的云烟里...甚至都不曾有人记起...

我也知道国内很多高校，或多或少总有一些想要二次开发Overleaf，实现一个更完整的Overleaf的，给学生们用。比如实现单点登录、实现Docker编译、git集成，但是不得不说，很多时候，往往**魔改简单**，**维护难**、更新难，你永远不知道魔改之后，下个版本还能不能用，会不会导致全校几千人用的Overleaf挂了。

所以我倒觉得，如果没有太多数据安全方面的考虑，果断拥抱官网Overleaf才是最聪明的选择。否则花费大量的时间二次开发、维护，反而更痛苦。官网功能那么全，还有github集成、甚至还集成了一些投稿，花时间二次开发，最后的结果都是被放弃或者抛弃的项目罢了

> 最后我还是想问，为什么国内几乎没有买Overleaf的大学呢？







