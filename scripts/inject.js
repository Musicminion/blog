// Author: Musicminion
// Description: Adds a custom avatar,msvalidate to the top of the page
hexo.extend.injector.register('head_begin', '<link rel="stylesheet" href="/css/my-avatar.css">', 'default');

// Add msvalidate
hexo.extend.injector.register('head_begin', '<meta name="msvalidate.01" content="3A0A333C87F53DC35E793673A0667DFC" />', 'default');

// Google 
hexo.extend.injector.register('head_begin', '<meta name="google-site-verification" content="2NUVG0mhrcFS8ODsFQju4NNmfpTNvWIMG5iqrvEM-88" />', 'default');

// baidu 
hexo.extend.injector.register('head_begin', '<meta name="baidu-site-verification" content="codeva-q9oPrfpq6W" />', 'default');

// Add edit url
hexo.extend.filter.register('theme_inject', function(injects) {
    // 旧的代码，不再使用，这个是分开插入的
    // injects.postMetaBottom.raw('editurl-script', '<script async src="/js/goEdit.js" crossorigin="anonymous"></script>');
    // injects.postMetaBottom.raw('editurl-tag1', '<div><i class="iconfont icon-pen"></i></div>');
    // injects.postMetaBottom.raw('editurl-tag', '<i class="iconfont icon-pen"></i>');
    // injects.postMetaBottom.raw('editurl-link', '<a href="javascript:goEdit()"> 编辑链接</a>');

    injects.postMetaBottom.raw('editurl-link', `<div class="post-meta">
    <script async src="/js/goEdit.js" crossorigin="anonymous"></script>
    <a href="javascript:goEdit()" style="font-size: .9rem;"> <i class="iconfont icon-pen"></i> 编辑链接 </a>
    </div>`);
})