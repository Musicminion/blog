function goEdit(){
    // 获取浏览器的地址的路径
    let path = window.location.pathname

    // 去掉末尾的/，如果有的话，因为后面要加上.md
    if (path.endsWith("/")){
        path = path.substring(0, path.length - 1)
    }

    // path 可能是 /<user>/<repo>/2025/06/Some-Problem-About-Git-an-Gitlab
    // 我们先获取mardkown文件的路径
    let pathParts = path.split("/");
    
    // 如果路径部分少于1个，返回
    if (pathParts.length < 1) {
        console.error("路径部分少于1个，无法编辑");
        return;
    }

    // 只保留最后3个部分, /2025/06/Some-Problem-About-Git-an-Gitlab
    if (pathParts.length > 3) {
        path = pathParts.slice(-3).join("/");
    } else {
        // 如果路径部分少于3个，就直接使用原路径
        path = pathParts.join("/");
    }

    let markdownFileName = pathParts[pathParts.length - 1] + ".md";

    // 最终的路径应该是 /source/_posts_src/2025/06/Some-Problem-About-Git-an-Gitlab/Some-Problem-About-Git-an-Gitlab.md
    // 这里我们需要将路径转换为 source/_posts_src/2025/06/Some-Problem-About-Git-an-Gitlab/Some-Problem-About-Git-an-Gitlab.md
    path +=  "/" + markdownFileName;

    // 编辑的地址，这里我用github.dev，免费的编辑器
    let editBaseUrl = "https://github.dev/Musicminion/blog/blob/main/source/_posts_src/"

    // 打开编辑页面
    window.open(editBaseUrl + path)
}

// 加上快捷键 当按下.的时候，就会调用getEditURL
document.addEventListener('keydown', function(event) {
    if (event.key === "."){
        goEdit()
    }
})