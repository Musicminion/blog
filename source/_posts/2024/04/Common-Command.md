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
cat ./id_rsa >> ./authorized_keys
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

