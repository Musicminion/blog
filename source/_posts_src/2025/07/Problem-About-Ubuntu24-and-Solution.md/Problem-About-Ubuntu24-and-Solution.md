---
title: Ubuntu 24 一些问题和解决
tags: [Ubuntu, Server, 输入法, 搜狗, 限制充电]
date: 2025-07-10T16:27:21Z
updated: 2025-07-10T16:27:21Z
index_img: 2024/04/Common-Command/ubuntu.png
banner_img: 2024/04/Common-Command/ubuntu.png
author: Musicminion
---


## Ubuntu 24 一些问题和解决

> 起因：Windows 的 Docker 容器实在过于难绷，文件系统的读写效率过低，所以最近我希望把自己的主力操作系统变成 Ubuntu，安装 Ubuntu24 后发现有一些诡异的问题。这篇文章就备忘录一下，方便以后安装 Ubuntu 之后使用。

### 一、屏幕缩放

> Ubuntu 的系统默认不支持 150% 这种分数比例的缩放，所以需要执行下面的命令：

install:

```bash
apt install dbus-x11
```

要在 Wayland 上的 GNOME 3.32 中启用分数缩放，请运行：

```bash
gsettings set org.gnome.mutter experimental-features "['scale-monitor-framebuffer']"
```

要在 Xorg 上的 Ubuntu 中启用分数缩放，请运行：

```bash
gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"
```

### 二、搜狗输入法

> 参考教程：[知乎教程：ubuntu 24 安装搜狗输入法](https://zhuanlan.zhihu.com/p/1924444784191313056 "知乎教程：ubuntu 24 安装搜狗输入法")

#### 1）安装框架：

```bash
# 更新系统软件包
sudo apt update

# 卸载 Fcitx5 和 IBus（如果存在）
sudo apt remove --purge fcitx5* ibus*

# 清理系统残留
sudo apt autoremove && sudo apt autoclean

# 安装 Fcitx4 输入法框架
sudo apt install fcitx

# 设置 Fcitx 开机自启动
sudo cp /usr/share/applications/fcitx.desktop /etc/xdg/autostart/
```

#### 2）配置语言

1. 打开系统设置：`Settings` → `Region & Language`​
2. 点击 `Manage Installed Languages`​
3. 在弹出的"语言支持"窗口中：

- 点击 `Install / Remove Languages...`​
- 勾选 `Chinese (simplified)`，点击 `Apply`​
- 在 `Keyboard input method system` 下拉菜单中选择 `fcitx`​
- 点击 `Apply System-Wide`​

#### 3）下载安装

前往官方下载页面：[搜狗输入法官方 Linux](https://shurufa.sogou.com/linux "搜狗输入法官方 Linux")

```bash
# 安装搜狗输入法，具体根据下载的文件而定
sudo dpkg -i ./sogoupinyin_4.2.1.145_amd64.deb

# 安装必要的依赖包
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1

# 修复可能的依赖关系问题
sudo apt install -f
```

Ubuntu 24.04 默认使用 Wayland 显示服务器，可能导致搜狗输入法出现闪烁或无法正常显示的问题。需要强制使用 Xorg：

```text
# 编辑 GDM 配置文件，vim 亦可
sudo nano /etc/gdm3/custom.conf

# 找到以下行并取消注释（删除行首的 #）：
# WaylandEnable=false

# 修改后应该是：
WaylandEnable=false
```

### 三、限制充电的电量

如果要限制充电百分之80%，可以通过如下操作，注意`BAT0`需要以你实际的为准：

```bash
echo 80 > /sys/class/power_supply/BAT0/charge_control_end_threshold
```

### 四、其他一些小 Tips

补充两个好用的工具：

- 温控和风扇控制软件：CoolerControl
- NVME磁盘监控：QDiskinfo

‍
