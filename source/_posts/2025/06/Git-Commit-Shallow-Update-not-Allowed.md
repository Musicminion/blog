---
title: Git 提交仓库遇到 Shallow update not allowed 修复
tags: [Git, GitHub, GitLab, Git-Commit, Shallow-Update]
date: 2025-06-26T16:03:11Z
updated: 2025-06-26T16:03:11Z
author: Musicminion
---

## Git 提交仓库遇到 Shallow update not allowed 修复

### 一、背景

今天拉取实验室的一个项目，因为这个项目年久失修，远程地址已经不再可用用了：

```bash
root@nvm:~/src-mount/LP/adlp-kernel# git remote -v
origin  http://10.0.2.33/gitlab/gccn/nvme-mdev-schd.git (fetch)
origin  http://10.0.2.33/gitlab/gccn/nvme-mdev-schd.git (push)
```

一查看Git下面，居然还有shallow文件夹：

```bash
root@nvm:~/src-mount/LP/adlp-kernel# ls ./.git
branches  config  description  HEAD  hooks  index  info  logs  objects  packed-refs  refs  shallow
```

这就很烦人了，一般来说在`Git clone`​项目的时候，为了节约传输的内容，加上 `--depth 1`​，只会拉最新的一次提交（或者最新的若干次的提交）

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

### 二、解决方法

在Satck Overflow 上面找到一个很好的方法，[push a shallow clone to a new repo](https://stackoverflow.com/questions/50992188/how-to-push-a-shallow-clone-to-a-new-repo)，具体操作如下：

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
- 尽量用`git log --graph --oneline`​查看一下提交的图路线，然后尽可能的顺着线性的顺序往上找

恢复完成后就可以推送过去了。
