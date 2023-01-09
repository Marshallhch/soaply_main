// $(document).ready(function () {
//   // do something...
// }); // not recommended...

$(function () {
  //   // Masonry Effect
  //   $(".grid").masonry({
  //     // options
  //     itemSelector: ".grid-item",
  //     // columnWidth: 200,
  //   });

  //   const gridBox = $(".grid");
  //   const gridBox1 = document.querySelector(".grid");
  //   console.log(gridBox1);
  //   console.log(gridBox);

  const getGalleryData = (data) => {
    // console.log(data);
    let items = [];
    $.each(data, function (i, item) {
      // console.log(i);
      // console.log(item);

      const galleryItems = `
            <div class="grid-item">
              <a href="/main_poject/pages/details.html?idx=${item.pro_idx}">
                <img src="/main_poject/images/products/${item.pro_img}" alt="">
                <span class="overlay">
                  <em class="common-btn">제품보기</em>
                </span>
              </a>
            </div>
        `;
      items.push($(galleryItems).get(0));
      // $(".grid").append($(galleryItems).get(0));
    });
    $(".grid").append(items);
    $(".grid").imagesLoaded(function () {
      // Masonry Effect
      $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        // columnWidth: 200,
      });
    });
  };

  $.getJSON("/main_backend/model/get_products.php?qnt=9", getGalleryData);

  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function (e) {
    e.preventDefault(); // a에 적용된 기본 기능 제거(클릭이벤트)
    const targetIdx = $(this).index();
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); // recommended...
