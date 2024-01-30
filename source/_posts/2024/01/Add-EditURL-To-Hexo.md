---
title: 给Hexo博客添加文章编辑链接
tags: [Halo, Fluid, 建站, 博客, 编辑链接]
date: 2024-01-30 21:00:00
updated: 2024-01-30 21:00:00
index_img: 2024/01/Add-EditURL-To-Hexo/effect.png
banner_img: 2024/01/Add-EditURL-To-Hexo/effect.png
author: Musicminion
typora-root-url: ./Add-EditURL-To-Hexo
---

## 给Hexo博客添加文章编辑链接

### 一、起源

我最早接触的静态网站生成器[Docusaurus](https://github.com/facebook/docusaurus)，Facebook家的东西，用来搞课程笔记很方便，里面有个功能就是：每篇文章的末尾都有一个编辑的URL，可以点一下就跳转到对应的Github，非常方便。

![](./Edit-URL.png)

这些年Github也在进步，微软把曾经本地的vscode变成了浏览器就可以用的[github.dev](https://github.dev)，也是一个很好用的功能，在浏览器里面就可以编辑文本代码，尽管不能调试。但是看代码的时候就很方便了，特别是**按下**<kbd>.</kbd>即可打开编辑器！自从知道了这个小技巧，我每次都是果断使用这个快捷键了！

用了hexo这个博客之后，好用固然好用，问题就是有时候我在看我博客的时候突然发现有个问题，然后就想要修改，于是乎就要打开github然后一个目录一个目录的点进去，发现效率太低。

有没有可能把hexo的这个博客和**快速编辑按钮**同时结合起来呢？搜索了一下`fluid`的主题里面的文档，发现没有这个需求，给Github的开发组提需求，开发组认为这个可以用注入的方法实现。

### 二、开始实践

#### 1）开始前检查

为了方便的找到在github上面的对应博文的路径，我采用的方法是保证：Github中`_post`文件目录的格式，和网站博客文章的URL的格式一样，否则就不可以。

举个例子，在`_config.yml`文件里面，有这样一行：

```yml
# 之前的永久链接是会把年份、月份、日期都加上的，但是我已经按照年份、月份、日期分好了文件夹
# 所以这里就不需要了，直接把永久链接设置为标题就可以了
# permalink: :year/:month/:day/:title/
permalink: :title/
```

因为我的`_post`文件夹的组织就是按照年份+月份组织的，所以我没有必要在`permalink`里面单独再加上年月日。我的文件结构如下：

```bash
@Musicminion ➜ /workspaces/blog (main) $ tree ./source/_posts/
./source/_posts/
├── 2024
│   └── 01
│       ├── From-Halo-To-Hexo
│       │   └── home.png
│       ├── From-Halo-To-Hexo.md
```

举个例子：

- `permalink: :title/`，原文章的`_post/2024/01/hello.md`最终的目录就会变成：`blog.com/2024/01/hello`
- `permalink: :year/:month/:day/:title/`，`:title`部分还是会变成`/2024/01/hello`，最终的结果就是：`blog.com/2024/01/31/2024/01/hello`，这显然不对劲是吧

显然没有人按照第二种方法这样干，因为重复了。所以如果需要快速跳转URL，就需要使用`permalink: :title/`，具体有关permalink的说明请查看[Permalinks | Hexo](https://hexo.io/docs/permalinks.html)

#### 2）开始代码注入

首先在`scripts`目录下，就是我们要注入的代码，可以随便新建一个`my.js`的文件，添加下面的内容

```js
// Add edit url
hexo.extend.filter.register('theme_inject', function(injects) {
    injects.postMetaBottom.raw('editurl-link', `<div class="post-meta">
    <script async src="/js/goEdit.js" crossorigin="anonymous"></script>
    <a href="javascript:goEdit()" style="font-size: .9rem;"> <i class="iconfont icon-pen"></i> 编辑链接 </a>
    </div>`);
})
```

然后为了把script引入，需要新建一个文件`source/js/goEdit.js`，并加上下面的内容

```js
function goEdit(){
    // 获取浏览器的地址的路径
    let path = window.location.pathname

    // 去掉末尾的/，如果有的话，因为后面要加上.md
    if (path.endsWith("/")){
        path = path.substring(0, path.length - 1)
    }
    
    // 编辑的地址，这里我用github.dev，免费的编辑器
    let editBaseUrl = "https://github.dev/Musicminion/blog/blob/main/source/_posts"

    // 打开编辑页面
    window.open(editBaseUrl + path + ".md")
}

// 加上快捷键 当按下.的时候，就会调用getEditURL
document.addEventListener('keydown', function(event) {
    if (event.key === "."){
        goEdit()
    }
})
```

此外我还加上了快捷键监听的，只要按句号<kbd>.</kbd>，就可以实现在新窗口中打开github的编辑了，感兴趣的小伙伴欢迎尝试。

#### 3）补充

当然，你可能有自己的URL的处理逻辑，具体的话你可以修改上面的`goEdit.js`的逻辑就好了。如果是一些其他方法生成的文章路径，只需要处理好`window.location.pathname`与github对应的链接的关系就好了。但是**如果博客文章的URL里面完全不包含任何的md路径文件信息，恐怕这个方法就没有任何作用了**。



