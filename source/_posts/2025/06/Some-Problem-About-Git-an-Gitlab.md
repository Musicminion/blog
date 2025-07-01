---
title: 近期遇到的 Git 有关的问题
tags: [Git, GitHub, GitLab, Git-Commit, Shallow-Update]
date: 2025-06-26T16:03:11Z
updated: 2025-07-01T23:33:11Z
author: Musicminion
---

## 近期遇到的 Git 有关的问题

### 一、Git 提交仓库遇到 Shallow update not allowed 修复

#### 1）背景

今天拉取实验室的一个项目，因为这个项目年久失修，远程地址已经不再可用用了：

```bash
root@nvm:~/src-mount/LP/adlp-kernel# git remote -v
origin  http://10.0.2.33/gitlab/gccn/nvme-mdev-schd.git (fetch)
origin  http://10.0.2.33/gitlab/gccn/nvme-mdev-schd.git (push)
```

一查看 Git 下面，居然还有 shallow 文件夹：

```bash
root@nvm:~/src-mount/LP/adlp-kernel# ls ./.git
branches  config  description  HEAD  hooks  index  info  logs  objects  packed-refs  refs  shallow
```

这就很烦人了，一般来说在 `Git clone` ​项目的时候，为了节约传输的内容，加上 `--depth 1`​，只会拉最新的一次提交（或者最新的若干次的提交）

```bash
git clone --depth 1 https://github.com/Musicminion/blog.git
```

但是因为老仓库已经不存在了，我现在希望吧这个仓库推送到其他的机器上面，结果问题就出现：

```bash
git remote remove origin
git remote add origin https://my.repo
git push -u origin --all
[...]
 ! [remote rejected] master -> master (shallow update not allowed)
```

#### 2）解决方法

在 Satck Overflow 上面找到一个很好的方法，[push a shallow clone to a new repo](https://stackoverflow.com/questions/50992188/how-to-push-a-shallow-clone-to-a-new-repo)，具体操作如下：

```bash
# First, shallow-clone the old repo to the depth we want to keep
git clone --depth=50 https://...@bitbucket.org/....git

# Go into the directory of the clone
cd clonedrepo

# Once in the clone's repo directory, remove the old origin
git remote remove origin

# Store the hash of the oldest commit (ie. in this case, the 50th) in a var
START_COMMIT=$(git rev-list master|tail -n 1)

# Checkout the oldest commit; detached HEAD
git checkout $START_COMMIT

# Create a new orphaned branch, which will be temporary
git checkout --orphan temp_branch

# Commit the initial commit for our new truncated history; it will be the state of the tree at the time of the oldest commit (the 50th)
git commit -m "Initial commit"

# Now that we have that initial commit, we're ready to replay all the other commits on top of it, in order, so rebase master onto it, except for the oldest commit whose parents don't exist in the shallow clone... it has been replaced by our 'initial commit'
git rebase --onto temp_branch $START_COMMIT master

# We're now ready to push this to the new remote repo... add the remote...
git remote add origin https://gitlab.com/....git

# ... and push.  We don't need to push the temp branch, only master, the beginning of whose commit chain will be our 'initial commit'
git push -u origin master
```

但是其实要注意一下：

- `START_COMMIT`​：并不一定要找当前本地仓库里面最老的一个 commit，否则可能要很久恢复，可以找一个尽量比较接近最新的
- 尽量用 `git log --graph --oneline` ​查看一下提交的图路线，然后尽可能的顺着线性的顺序往上找

恢复完成后就可以推送过去了。

### 二、Git 推送大仓库的的过程

#### 1）背景

起因就是我在拉取 Linux Kernal 的代码的时候，发现代码仓库实在太大，我发现

```bash
@Musicminion➜/workspaces/codespaces-blank/linux.git (master) $ git push --set-upstream origin --all
Enumerating objects: 10917187, done.
Counting objects: 100% (10917187/10917187), done.
Delta compression using up to 2 threads
Compressing objects: 100% (1876695/1876695), done.
Writing objects: 100% (10917187/10917187), 2.92 GiB | 7.76 MiB/s, done.
Total 10917187 (delta 8983126), reused 10917187 (delta 8983126), pack-reused 0 (from 0)
error: RPC failed; HTTP 504 curl 22 The requested URL returned error: 504
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
Everything up-to-date
```

Git push 各阶段解析：

1. `Enumerating objects`​：Git 在找出哪些提交、树对象、blob 等是你本地有而远程没有的。
2. `Counting objects`​：Git 统计这些对象的数量，准备处理。

3. `Compressing objects` ​Git 用 zlib 对这些对象打包压缩（packfile）。是 CPU 密集型操作，发生在 **本地**。
4. `Writing objects` ​把压缩打包好的数据，通过 HTTP/SSH/其他协议传输到远程仓库。是网络 IO 密集型操作。​`Writing objects` ​把压缩打包好的数据，通过 HTTP/SSH/其他协议传输到远程仓库。

5. `Resolving deltas` ​远程仓库接收对象后处理增量关系（在服务端发生），比如 GitLab 会在服务端再解析、存储。

> 所以，也就是说：<u>Writing 阶段是 Git 有关网络传输的</u>，但是并不是东西发送过去就全部结束了。需要等远程的服务器 `Resolving deltas` ​之后才是算 Git 全部推送完。

#### 2）解决

解决方法是防止 Git 超时，具体需要把 Gitlab 的 nginx 配置超时的时间全部拉长，使用 docker 部署的 `gitlab.rb`​ ​的文件需要修改：

```bash
nginx['listen_https'] = false
nginx['listen_port'] = 80
nginx['client_max_body_size'] = '102400m'
nginx['proxy_read_timeout'] = '3600'
nginx['proxy_connect_timeout'] = '3600'
nginx['proxy_send_timeout'] = '3600'
nginx['send_timeout'] = '3600'
```

如果你自己还架设了反向代理，nginx 里面的服务器也要做对应的修改：

```bash
server {
    listen 0.0.0.0:443 ssl;
    server_name git.domain.com;
    server_tokens off;

    ssl_certificate fullchain.cer;
    ssl_certificate_key your.domain.key;
	# Add following contents
    client_max_body_size 0;
    proxy_read_timeout 6000s;
    proxy_connect_timeout 6000s;
    proxy_send_timeout 6000s;
    send_timeout 6000s;
}
```

此外，一种方法是，增加 Git 的 Post Buffer：

```bash
git config --global http.postBuffer 524288000
```

这样的话大概率可以解决超时的问题，如果还是不行建议直接使用 Gitlab 自带的导入的功能。

### 三、Vscode Git 的跟踪文件数量超过限制

因为 Linux Kernal 合并代码的时候更改太多，merge 出现冲突可能不显示，所以需要增加 `settings.json` ​文件

```json
{
	"git.statusLimit": 0,
}
```