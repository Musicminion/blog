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

#### 2）Linux 生成密钥对

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

