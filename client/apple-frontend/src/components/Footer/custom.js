import $ from 'jquery';

$(document).ready(() => {

  let footerh3 = $(".footer-links-wrapper h3");
  footerh3.on("click", function () {
    // console.log($(window).width());
    if ($(window).width() <= 768) {
      $(this).next("ul").slideToggle();
      // console.log($(this).text());
   
      $(this).toggleClass("expanded");
    }
  });

  $(window).resize(function () {
    // console.log($(window).width());
    if ($(window).width() > 768 || $(window).width() <= 768) {
      location.reload();
    }
  
  });
});

