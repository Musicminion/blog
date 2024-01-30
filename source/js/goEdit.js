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