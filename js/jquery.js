// $(document).ready(function () {
//   // do something...
// }); // not recommended...

$(function () {
  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function (e) {
    e.preventDefault(); // a에 적용된 기본 기능 제거(클릭이벤트)
    const targetIdx = $(this).index();
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); // recommended...
