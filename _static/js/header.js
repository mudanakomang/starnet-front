var html = `<header class="is-flex vertical-center">
<div class="wrapper is-flex vertical-center center">
  <div class="header-nav-wrap is-flex">
    <div class="logo">
      <img src="/_static/images/header-logo.png" alt="">
    </div>
    <div class="is-sp" id="Hamburger">
      <span id="line1"></span>
      <span id="line2"></span>
      <span id="line3"></span>
    </div>
    <div class="is-sp" id="SpNav">
      <div class="logo is-flex vertical-center">
        <img class="center" src="/_static/images/header-logo.png" alt="">
      </div>
      <ul>
        <li><a href="#">開催イベント一覧</a></li>
        <li><a href="#">主催者一覧</a></li>
        <li><a href="#">イベントカテゴリ一覧</a></li>
      </ul>
      <div class="header-button-wrap is-flex">
        <a class="login is-flex vertical-center" href="#">
          <div class="center">ログイン</div>
        </a>
        <a class="register is-flex vertical-center" href="#">
          <div class="center">新規登録</div>
        </a>
      </div>
    </div>
    <nav class="is-pc is-flex vertical-center">
      <ul class="is-flex vertical-center">
        <li><a href="#">開催イベント一覧</a></li>
        <li><a href="#">主催者一覧</a></li>
        <li><a href="#">イベントカテゴリ一覧</a></li>
      </ul>
    </nav>
  </div>
  <div class="is-pc header-button-wrap is-flex">
    <a class="login is-flex vertical-center" href="#">
      <div class="center">ログイン</div>
    </a>
    <a class="register is-flex vertical-center" href="#">
      <div class="center">新規登録</div>
    </a>
  </div>
</div>
</header>`;
document.write(html);
