window.addEventListener("load", function () {
  mainVisualSlider();
  AOS.init({
    //swipe시 요소 전환 시간
    duration: 600,
    once: true,
  });

  var fullpageLinks = document.querySelectorAll(
    "#fullpage a, #fullpage button"
  );
  fullpageLinks.forEach(function (link) {
    link.setAttribute("tabindex", "-1");
  });
});

function mainVisualSlider() {
  let visualSLiderTotal = $(".main-visual .swiper-slide").length;
  // 화면 지속 시간
  let delay = 6965;
  let mainVisual = new Swiper(".main-visual", {
    loop: true,
    //화면 전환 시간
    speed: 600,
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },

    observeParents: true,
    observeSlideChildren: true,
  });
}

$(document).ready(function () {
  respond();
  $(window).on("resize", function () {
    respond();
  });
  $(window).on("scroll", function () {
    scrolled();
  });

  topMenu();
  topMenu_m();
  scrolled();
  goTopMove();

  langSelect();
  familySiteSelect();
  selectUi();
});

$(window).on("load", function () {
  scrollMove();
});

function selectUi() {
  $(".select").each(function () {
    const $this = $(this);
    const $selected = $this.children(".selected-label");
    let $checked = $this.find("input[checked]");

    if ($checked.length > 0) {
      $selected.text($checked.next().text());
    }

    $selected.on("click", function () {
      if (!$this.hasClass("active")) {
        $(".select").removeClass("active");
      }
      $this.toggleClass("active");
    });
    $this.find("label").on("click", function () {
      $this.toggleClass("active");
      $selected.text($(this).text());
    });
  });
}

function respond() {
  let w = $("html").width();
  w < 1100 ? mobileLayout() : pcLayout();
}

function mobileLayout() {
  $("html").removeClass("pc").addClass("mobile");
  //怨듭떆�뺣낫
  if (document.querySelector(".board-list.notice") != null) {
    const $title = document.querySelectorAll(".board-list.notice tbody .title");
    const $date = document.querySelectorAll(".board-list.notice tbody .date");
    [...$title].forEach((el, index) => {
      el.parentElement.insertBefore(el, $date[index]);
    });
  }
}

function pcLayout() {
  $("html").removeClass("mobile").addClass("pc");
  //怨듭떆�뺣낫
  if (document.querySelector(".board-list.notice") != null) {
    const $title = document.querySelectorAll(".board-list.notice tbody .title");
    const $date = document.querySelectorAll(".board-list.notice tbody .date");
    [...$date].forEach((el, index) => {
      el.parentElement.insertBefore(el, $title[index]);
    });
  }
}

function goTopMove() {
  if ($(".go-top").length < 1) {
    return;
  }

  const $btn = $(".go-top");
  const $window = $(window);
  const $footer = $("#footer");
  const bottom_origin = $("html").hasClass("pc") ? 40 : 20;
  const checkY = $("html").hasClass("pc") ? 600 : 300;
  let scrollY = $window.scrollTop();
  let bottom;
  let gap;
  let vh = window.innerHeight * 0.01;
  let window_height = vh * 100;

  $btn.on("click", function (e) {
    e.preventDefault();
    $window.scrollTop(0);
  });

  $window.on("scroll", function () {
    btnPosition();
  });
  $window.on("resize", function () {
    btnPosition();
  });

  function btnPosition() {
    vh = window.innerHeight * 0.01;
    window_height = vh * 100;

    scrollY = $(this).scrollTop();
    scrollY > checkY ? $btn.addClass("on") : $btn.removeClass("on");
    gap = scrollY + window_height - $footer.offset().top;

    if (gap > 0) {
      bottom = gap + bottom_origin;
    } else {
      bottom = bottom_origin;
    }

    $btn.css("bottom", bottom);
  }
}

function scrolled() {
  const $header = $("body:not(.fullpage) #header");
  if ($header.length > 0) {
    if ($(window).scrollTop() > 0) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  }
}

function langSelect() {
  const $langWrap = $(".lang-wrap");
  $langWrap.children("button").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $langWrap.on("mouseleave", function () {
    $(this).removeClass("active");
  });
}

function familySiteSelect() {
  const $siteWrap = $(".f-family-site");
  $siteWrap.children("button").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $siteWrap.on("mouseleave", function () {
    $(this).removeClass("active");
  });
}

function topMenu() {
  const $ganvLi = $(".gnav-list > li");
  const activeNum = $(".gnav-list > li.active").index();

  $("#gnav").on("mouseleave", function () {
    if (activeNum >= 0) {
      $ganvLi.eq(activeNum).addClass("active");
    }
  });
  $ganvLi.children("a").on("mouseenter", function () {
    $ganvLi.removeClass("active");
    $(this).parent().addClass("active");
  });
  $ganvLi.on("mouseleave", function () {
    $ganvLi.removeClass("active");
  });
}

function topMenu_m() {
  const $btnMenu = $(".btn-menu");
  const $btnClose = $(".mobile-nav .btn-menu-close");
  const $mMenu = $(".mobile-nav");
  const $html = $("html");

  $btnMenu.on("click", function () {
    menuOpen();
  });
  $btnClose.on("click", function () {
    menuClose();
  });

  function menuOpen() {
    $html.css({
      overflow: "hidden",
      "touch-action": "none",
    });
    $mMenu.addClass("active");
  }

  function menuClose() {
    $html.css({
      overflow: "auto",
      "touch-action": "auto",
    });
    $mMenu.removeClass("active");
  }
}

function scrollMove() {
  if ($(".scroll-tab").length < 1) {
    return;
  }

  $(".sub-lnav").before("<div class='sub-lnav-position'></div>");

  let headerHeight;
  let tabMenuY;
  let $contentList = $(".scroll-con");
  let $tabList = $(".scroll-tab li");
  let contentListPos;
  let lastY = window.pageYOffset;

  const $header = $("body:not(.main) #header");
  let activeIndex;

  let targetValue;
  let targetList = [];
  const targetKey = "con";

  init();
  initEvent();
  updateScroll();

  let timer = null;
  $(window).on("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      init();
    }, 300);
  });

  function init() {
    headerHeight = $("#header").height();
    tabMenuHeight = $(".scroll-tab").height();
    tabMenuY = $(".sub-lnav-position").offset().top - tabMenuHeight;
    contentListPos = [];

    if (lastY < 1 && $tabList.filter(".active").length < 1) {
      $tabList.eq(0).addClass("active");
      activeIndex = 0;
    }

    const vars = window.location.search.substring(1).split("&");
    if (vars.length > 0) {
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == targetKey) {
          targetValue = pair[1];
        }
      }
      if (targetValue) {
        $contentList.each(function (index) {
          targetList.push($contentList.eq(index).attr("data-target"));
        });
      }
    }

    $contentList.each(function (index) {
      let y = Math.floor($contentList.eq(index).offset().top - headerHeight);
      contentListPos.push(y);
      if (targetValue) {
        targetList.push($contentList.eq(index).attr("data-target"));
      }
    });
  }

  function initEvent() {
    $(window).on("scroll", function () {
      updateScroll();
    });
    $tabList.on("click", function () {
      if ($contentList.length < 1) {
        return;
      }
      goContent($(this).index());

      setTimeout(function () {
        $header.addClass("up");
        $(".sub-lnav").css("top", 0);
      }, 1000);
    });
    $tabList.children("a").on("click", function (e) {
      if ($contentList.length > 0) {
        e.preventDefault();
      }
    });
    if (targetValue) {
      goContent(targetList.findIndex((item) => item == targetValue));
    }
  }

  function goContent(index) {
    $(window).scrollTop(contentListPos[index] + 1);
  }

  function updateScroll() {
    if (checkedTabMenuFixed() == true) {
      updateTabMenu();
    }
    lastY = window.pageYOffset;
  }

  function checkedTabMenuFixed() {
    let scrollY = window.pageYOffset;
    if (0 > tabMenuY - scrollY) {
      $(".sub-lnav").addClass("fixed");
      if (lastY != 0 && lastY <= scrollY) {
        $header.addClass("up");
        $(".sub-lnav").css("top", 0);
      } else {
        $header.removeClass("up");
        $(".sub-lnav").css("top", headerHeight);
      }
      return true;
    } else {
      $(".sub-lnav").removeClass("fixed");
      $header.removeClass("up");
      $(".sub-lnav").css("top", headerHeight);
      return false;
    }
  }

  function updateTabMenu() {
    let scrollY = window.pageYOffset;
    [...$contentList].forEach((el, index) => {
      let tabContentY = contentListPos[index];
      if (scrollY >= tabContentY) {
        $tabList.filter(".active").removeClass("active");
        $tabList.eq(index).addClass("active");
        $contentList.filter(".active").removeClass("active");
        $contentList.eq(index).addClass("active");
        activeIndex = index;
      }
    });
  }
}

function historySlider() {
  new Swiper(".history-wrap", {
    loop: false,
    speed: 600,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".history-swiper-control .btn-swiper-next",
      prevEl: ".history-swiper-control .btn-swiper-prev",
    },
  });
}

function subsidiarySlider() {
  new Swiper(".subsidiary-wrap", {
    loop: false,
    speed: 600,
    slidesPerView: 3,
    spaceBetween: 24,
    breakpoints: {
      884: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
    },
    pagination: {
      el: ".subsidiary-paging",
    },
    followFinger: false,
  });
}

function dataCenterSlider() {
  new Swiper(".service-photo-slider", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".service-photo-slider .pagination",
    },
  });
}

function introVideo() {
  const $video = document.querySelector(".intro-video video");
  const $btnPlay = $(".intro-video .btn-play");

  $btnPlay.on("click", function () {
    $video.play();
    $(this).hide();
  });
  $video.addEventListener("play", () => $btnPlay.hide());
  $video.addEventListener("pause", () => $btnPlay.show());
  $video.addEventListener("ended", () => $btnPlay.show());
}
