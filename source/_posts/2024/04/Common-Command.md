---
title: 常用命令汇总
tags: [Linux, 运维, Common]
date: 2024-04-05 13:25:00
updated: 2024-04-05 13:25:00
index_img: 2024/04/Common-Command/ubuntu.png
banner_img: 2024/04/Common-Command/ubuntu.png
author: Musicminion
typora-root-url: ./Common-Tools
---

## 服务器常用命令汇总

[TOC]

### 一、用户管理

#### 1）Linux 创建用户/添加sudo

```bash
# 使用sudo或者root直接登录
adduser ayaka
usermod -aG sudo ayaka
```

#### 2）Linux sudo免密码

```bash
# 首先给这个增加写权限
chmod u+w /etc/sudoers
# 编辑这个文件
nano /etc/sudoers
# 最后还原，确保没有写权限
chmod u-w /etc/sudoers
```

然后编辑内容：

```bash
# User privilege specification
root	ALL=(ALL:ALL) ALL
# Members of the admin group may gain root privileges
%admin  ALL=(ALL) ALL 

# [阿里云轻量] 把上面的修改成 %admin ALL=(ALL:ALL) NOPASSWD: ALL，可以让管理员免密sudo

# Allow members of group sudo to execute any command
%sudo	ALL=(ALL:ALL) ALL
# [sudo全部免密] 或者这里，根据你的需要修改

# [仅特定用户] 下面的user是你的用户名 添加这一行就能免密sudo了
# user ALL=(ALL:ALL) NOPASSWD: ALL
```

#### 3）Linux 生成密钥对

- 第一步：在服务器/你的windows电脑，生成密钥对（密钥只要可以**配对**，不管在哪生成的），建议就保存在默认的位置

```bash
ssh-keygen -t rsa -b 4096 # -C "ayaka@ayaka.space"
```

- 第二步：在服务器上，进入`~/.ssh`文件夹：
  - 如果没有`authorized_keys`文件，请新建一个这样空文件：
  - 然后把你刚刚生成的`id_rsa` 和 `id_rsa.pub` 拷贝到`~/.ssh`文件夹下面
  - `authorized_keys`这个文件存放的是：允许登录的用户的公钥！

```bash
ayaka@k8s-master:~/.ssh$ ls
authorized_keys  id_rsa  id_rsa.pub
```

- 第三步：把公钥内容`id_rsa.pub`添加到`authorized_keys`里面

```bash
cat ./id_rsa.pub >> ./authorized_keys
```

- 第四步：打开vscode，然后进入ssh的配置文件，填写

```txt
Host 你的服务器IP
HostName 你的服务器IP
User 你的用户名
IdentityFile D:/key/id_rsa(改成你的密钥位置，windows还需要自行修改权限)
PasswordAuthentication no
```

#### 4）sshd: no hostkeys available

在SSH服务器启动时，如果出现sshd: no hostkeys available的错误，通常是由于证书文件的问题。需要执行下面的命令即可。

```bash
ssh-keygen -A
```

### 二、工具安装

#### 1）Linux 安装Docker

```bash
# !/bin/bash

# install docker
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 安装完成都是要sudo 才能用，如果希望直接就可以用，需要执行：
# sudo usermod -aG docker ${USER}
# 注意：阿里云的ecs assistant User的这个环境变量是空的！记得echo一下
```

#### 2）Docker 网络代理

> 公司或者学校难免会有内网环境需要连接，拉取镜像什么的。但是Docker的网络代理非常复制，分成好几个阶段的区别。

- Docker Pull的代理：执行docker pull时，是由守护进程dockerd来执行。因此，代理需要配在dockerd的环境中。而这个环境，则是受systemd所管控，因此实际是systemd的配置。

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf

# 然后在文件里面添加上下面内容，记得修改成你需要的网络代理，虚拟机内配置请修改为主机的IP
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080/"
Environment="HTTPS_PROXY=http://proxy.example.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"

# 添加完成后，要让配置生效
sudo systemctl daemon-reload
sudo systemctl restart docker
```

- 在容器运行阶段，如果需要代理上网，则需要配置`~/.docker/config.json`。以下配置，只在Docker 17.07及以上版本生效。（当然你也可以手动在容器里面设置环境变量来代理）

```json
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://proxy.example.com:8080",
     "httpsProxy": "http://proxy.example.com:8080",
     "noProxy": "localhost,127.0.0.1,.example.com"
   }
 }
}
```

- Docker Build 代理：

```bash
docker build . \
    --build-arg "HTTP_PROXY=http://proxy.example.com:8080/" \
    --build-arg "HTTPS_PROXY=http://proxy.example.com:8080/" \
    --build-arg "NO_PROXY=localhost,127.0.0.1,.example.com" \
    -t your/image:tag
```

#### 3）Docker 磁盘与清理

如下所示：通过`docker system df`查看即可：

```bash
admin@iZj6cckkqhgd7jajtcsk2jZ:~$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          8         7         17.59GB   13.2GB (75%)
Containers      7         7         4.38MB    0B (0%)
Local Volumes   64        1         230.5MB   230.5MB (100%)
Build Cache     0         0         0B        0B
```

清理Docker缓存容量：

```bash
docker system prune    # 浅度清理
docker system prune -a # 深度清理
```

### 三、磁盘管理

> 这部分主要是服务器磁盘空间、清理、扩容有关的内容。

#### 1）查看磁盘空间

```bash
admin@localhost:~$ df -Th
Filesystem     Type   Size  Used Avail Use% Mounted on
tmpfs          tmpfs  373M  1.3M  372M   1% /run
/dev/vda1      ext4    79G   39G   38G  51% /
tmpfs          tmpfs  1.9G     0  1.9G   0% /dev/shm
tmpfs          tmpfs  5.0M     0  5.0M   0% /run/lock
tmpfs          tmpfs  373M     0  373M   0% /run/user/1000
```

一般如上所示，`/dev/vda1`代表的就是主文件系统，Size表示总大小，Used代表使用的大小。

#### 2）扩容磁盘

在阿里云或者通过VM ware虚拟机对硬件进行扩容后，还需要在系统中手动扩容生效，具体命令如下：

首先，需要确认磁盘容量：

```bash
# 确认磁盘容量是否符合购买显示的内容
fdisk -lu
```

然后，安装扩容工具并进行扩容分区：

```bash
apt-get update
apt-get install -y cloud-guest-utils
growpart /dev/vda 1
resize2fs /dev/vda1
```

最后，还是运行命令`df -Th`查看是否扩容成功。

#### 3）查看文件夹占用

统计当前文件夹的目录占用：

```bash
du -sh .
```

