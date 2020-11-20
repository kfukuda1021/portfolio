var docObj = $(document);

/*============================
セレクトボックス1
============================*/
function selectboxStyle($selectArea) {
  var optionSelectedText = $selectArea.find('select option:selected').text();
  $selectArea.children('.selectArea__text').text(optionSelectedText);
}

/*============================
セレクトボックス2
============================*/
function setSelectArea() {
  $('.selectArea').each(function (i) {
    selectboxStyle($(this));
  }).on({
    change: function () {
      selectboxStyle($(this));
    },
    mouseover: function () {
      $(this).children('.selectArea__text').addClass('selectArea__text_state-hover');
    },
    mouseout: function () {
      $(this).children('.selectArea__text').removeClass('selectArea__text_state-hover');
    }
  });
}

/*============================
ドロワーメニュー
============================*/
function drawer() {
  var $menu = $('.l-navi'),
    $wrapper = $('.l-body__wrapper'),
    menuWidth = 248;
  $wrapper.prepend('<div class="overlay"></div>');
  // 初期化処理
  docObj.off('click', '.btn-open');

  function btnClick() {
    $wrapper.stop().animate({
      'left': 0
    }, 300, function () {
      $('body').removeClass('drawer-open');
    });
    $('.overlay').fadeOut();
    $('.btn-open').fadeIn('fast');
  }

  docObj.on('click', '.btn-open', function () {
    $('body').addClass('drawer-open');
    $wrapper.stop().animate({
      'left': menuWidth
    }, 300);
    $(this).fadeOut('fast');
    $('.overlay').fadeIn();
  });

  docObj.on('click', '.btn-close', function () {
    btnClick();
  });

  docObj.on('click', '.overlay', function () {
    btnClick();
  });
}

/*============================
アカウントメニュー
============================*/
function accountMenu() {
  // 初期化処理
  docObj.off('click', '.account__detail');

  var $accountMenu = $('.account__list');

  docObj.on('click', '.account__detail', function (e) {
    if (!$accountMenu.hasClass('open')) {
      $accountMenu.addClass('open').stop().slideDown();
    } else {
      $accountMenu.removeClass('open').stop().slideUp();
      $('.bg_overlay').remove();
    }
    return false;
  });

  docObj.on('click', '.l-container', function (e) {
    if ($accountMenu.hasClass('open')) {
      $accountMenu.removeClass('open').stop().slideUp();
    }
  });

}

function dorpDown() {
  // 初期化処理
  docObj.off('mouseover', '.gnavi__item');
  docObj.off('mouseleave', '.gnavi__item');

  docObj.on('mouseover', '.gnavi__item', function (e) {
    var $accountMenu = $(this).children('.dorp-down');
    $accountMenu.stop().slideDown();
    return false;
  });
  docObj.on('mouseleave', '.gnavi__item', function (e) {
    var $accountMenu = $(this).children('.dorp-down');
    $accountMenu.stop().slideUp();
    return false;
  });

}

/*============================
tab
============================*/
function tab() {
  // 初期化処理
  docObj.off('click', '.tab__head__item');

  docObj.on('click', '.tab__head__item', function () {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      var $tab = $this.parents('.tab');
      var contentId = $tab.find('.tab__head__item').index(this);
      var $tabContentItem = $tab.find('.tab__content__item');

      $this.siblings('.tab__head__item').removeClass('active');
      $this.addClass('active');
      $tabContentItem.stop().removeClass('active').hide();
      $tabContentItem.eq(contentId).fadeIn(300, function () {
        $(this).addClass('active');
      });
    }
  });
}

/*============================
日付
============================*/
function picker() {
  // 日付のみ
  $('.date').datetimepicker({
    format: 'Y年m月d日',
    timepicker: false,
    lang: 'ja'
  });
}

/*============================
inputText
============================*/
function inputText() {
  // 初期化処理
  docObj.off('focus', '.login input');
  docObj.off('blur', '.login input');

  $('.login input').prop('disabled', false);
  $('.login input').each(function () {
    if ($(this).val() !== '') {
      $(this).addClass('onfocus');
    }
  });
  docObj.on('focus', '.login input', function () {
    $(this).addClass('onfocus');
  });

  docObj.on('blur', '.login input', function () {
    if ($(this).val() === '') {
      $(this).removeClass('onfocus');
    }
  });
}

// /*============================
// トップへスクロール
// ============================*/
// function toTopScroll() {
//   // 初期化処理
//   docObj.off('click', '.fnavi a');

//   docObj.on('click', '.fnavi a', function () {
//     var offsetTop = offsetTop = $($(this).attr("href")).offset().top;

//     $("html,body").animate({
//         scrollTop: offsetTop
//       },
//       "slow",
//       "swing"
//     );
//     return false;
//   });
// }

/*============================
magnificPopup
※モーダルウインドウ
============================*/
function modal() {
  // 画像
  $('.parent-container').magnificPopup({

    delegate: 'a',
    type: 'image',
    gallery: { //ギャラリー表示にする
      enabled: true
    },
    removalDelay: 500, //delay removal アウトする際のアニメーションの遅延
    callbacks: {
      beforeOpen: function () {
        // mfp-with-anim クラスをマークアップに追加
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click.
  });
  // yotube
  $('.yt_link').magnificPopup({

    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 150,
    preloader: false,
    fixedContentPos: false

  });
}

/*============================
isotope
============================*/
function isotope() {

  var $container = $('#container');
  $container.isotope({
    // options
    itemSelector: '.grid-item',
    // layoutMode: 'fitRows', //fitRowsは同じ高さを持っているアイテムに最適
    // masonry: {
    //   columnWidth: 200
    // }

  });

  // まずはIsotopeを実行します。
  var $container = $('#container').isotope();
  // jQueryを使って、クリックイベントを追加
  $('#filters').on('click', 'button', function () {
    //クリックしたボタンのdata-filterの値を変数に格納します
    var filterValue = $(this).attr('data-filter');
    //ここでオプションのfilterを発動させています。
    //date-filterの値を使ってフィルタリングを行います。
    $container.isotope({
      filter: filterValue
    });
  });

}

/*============================
ボタンの切り替え
============================*/
function btnSort() {
  $('.btnSort').click(function () {
    $('.btnSort').removeClass('is-active');
    $(this).addClass('is-active');
  });
}

/*============================
スマホメニュー
============================*/
function btnsp() {
  $('.btn-sp, .overlay-sp').click(function () {
    var menuIcon = $('.btn-sp span');
    var overLay = $('.overlay-sp');

    // メニューボタン
    if (menuIcon.attr('class') == 'icon-menu') {
      menuIcon.removeClass('icon-menu').addClass('icon-close');
      overLay.fadeIn().css('display', 'block');
    } else {
      menuIcon.removeClass('icon-close').addClass('icon-menu');
      overLay.css('display', 'none');
    }
    // メニュー表示/非表示
    $('.l-navi__sp').stop().slideToggle();
  });

  //　マウスカーソルの位置（メニュー上/メニュー外）
  $('.l-navi__sp').hover(function () {
    over_flg = true;
  }, function () {
    over_flg = false;
  });
}

/*============================
スクロールしたらシャドウ
============================*/
function scrollShadow() {
  var header = $('.l-header')

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      header.addClass('shadow');
    } else {
      header.removeClass('shadow');
    }
  });
}

/*============================
サイドナビ
============================*/
function Gnavi() {
  var activeUrl = location.pathname.split("/")[3];
  navList = $(".l-navi__item").find("a");

  navList.each(function () {
    if ($(this).attr("href").split("/")[3] == activeUrl) {
      $(this).addClass("is-active");
    };
  });
}

// /*============================
// returnTop
// ============================*/
function returnTop() {

  var topBtn = $('.fnavi');

  //ボタンを非表示にする
  topBtn.hide();

  //スクロールしてページトップから100に達したらボタンを表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      //フェードインで表示
      topBtn.fadeIn();
    } else {
      //フェードアウトで非表示
      topBtn.fadeOut();
    }
  });

  //フッター手前でボタンを止める（ここを追加する）
  $(window).scroll(function () {
    var height = $(document).height(); //ドキュメントの高さ
    var position = $(window).height() + $(window).scrollTop(); //ページトップから現在地までの高さ
    var footer = $("footer").height(); //フッターの高さ
    var pcwidth = window.matchMedia("(min-width: 768px)").matches
    var spwidth = window.matchMedia("(max-width: 768px)").matches

    if (height - position < footer & pcwidth) {
      topBtn.css({
        position: "absolute",
        top: -78
      });
    } else if (height - position < footer & spwidth) {
      topBtn.css({
        position: "relative",
        top: 0
      });
    } else {
      topBtn.css({
        position: "fixed",
        top: "auto"
      });
    }
  });

  //スクロールしてトップへ戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

}


function frontendInit() {

  try {

    setSelectArea();

    drawer();

    accountMenu();

    dorpDown();

    tab();

    picker();

    inputText();

    // toTopScroll();

    modal();

    isotope();

    btnSort();

    btnsp();

    returnTop();

    // scrollShadow();

    // Gnavi();

  } catch (e) {

  } finally {
    // 終了処理
  }

};

$(window).load(function () {
  frontendInit();
});