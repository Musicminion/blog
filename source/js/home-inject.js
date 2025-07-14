(function() {
    var banner = document.getElementById('banner');
    if (!banner) return;

    // 判断当前背景图是否为 theme.xxx
    var bg = banner.style.backgroundImage || banner.style.background;
    // 兼容 background 属性
    if (!bg) {
        bg = window.getComputedStyle(banner).backgroundImage;
    }
    // 只在背景图为 /assets/images/background/ayaka-blue.xxx 时才执行切换
    if (!/\/assets\/images\/background\/ayaka-blue\./.test(bg)) return;
  // 读取配置的图片路径（默认成为default.png, 建议不设置切图的话把大屏图命名为default）
  var bannerImgLight = window.BANNER_IMG_LIGHT || './img/default.png';
  var bannerImgDark = window.BANNER_IMG_DARK || './img/default.png';

  function setBanner() {
    var banner = document.getElementById('banner');
    if (!banner) return;
    var html = document.documentElement;
    var mode = html.getAttribute('data-user-color-scheme');
    if (mode === 'dark') {
      banner.style.backgroundImage = "url('" + bannerImgDark + "')";
      banner.style.background = "url('" + bannerImgDark + "') center center / cover no-repeat";
    } else {
      banner.style.backgroundImage = "url('" + bannerImgLight + "')";
      banner.style.background = "url('" + bannerImgLight + "') center center / cover no-repeat";
    }
    console.log('[banner] 已重新渲染大图，当前模式：', mode);
  }

  // 初始执行
  setBanner();

  // 监听属性变化
  var observer = new MutationObserver(setBanner);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-user-color-scheme'] });
})();


// 等待 DOM 加载完毕
document.addEventListener("DOMContentLoaded", function () {
  const subtitle = document.querySelector("#subtitle");
  if (!subtitle) return;
  // 创建 avatar 元素
  const avatar = document.createElement("img");
  avatar.src = "/assets/images/avatar/avatar.png";
  avatar.className = "my-avatar";

  // 创建换行元素
  const br = document.createElement("br");

  // 插入到 subtitle 前
  subtitle.parentNode.insertBefore(avatar, subtitle);
  subtitle.parentNode.insertBefore(br, subtitle);
});