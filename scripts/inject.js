// Author: Musicminion
// Description: Adds a custom avatar,msvalidate to the top of the page
hexo.extend.injector.register('head_begin', '<link rel="stylesheet" href="/css/my-avatar.css">', 'default');

// Add msvalidate
hexo.extend.injector.register('head_begin', '<meta name="msvalidate.01" content="3A0A333C87F53DC35E793673A0667DFC" />', 'default');
