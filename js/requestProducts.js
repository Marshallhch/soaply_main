window.addEventListener("load", function () {
  /********** Get Products Json Data **********/
  const productsBox = document.querySelector(".products");

  const pgadr = window.location.href;
  let queryQnt;
  if (pgadr.includes("shop")) {
    queryQnt = "all";
  } else {
    queryQnt = 3;
  }

  const getData = async () => {
    // /main_poject/data/products.json
    await fetch(`/main_backend/model/get_products.php?qnt=${queryQnt}`, {
      cache: "no-cache",
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        let dataEl;
        // console.log(data);
        data.map((item) => {
          // console.log(item);
          dataEl = `
            <div class="product-frame">
              <div class="product-item">
                  <img src="/main_poject/images/products/${
                    item.pro_img
                  }" alt="">
                  <div class="product-text">
                      <h4>${item.pro_name}</h4>
                      <strong>${item.pro_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                      <p>${item.pro_desc}</p>
                      <a href="/main_poject/pages/details.html?idx=${
                        item.pro_idx
                      }" class="common-btn">자세히 보기</a>
                  </div>
              </div>
            </div>
            `;
          productsBox.innerHTML += dataEl;
        });
        loadMore();
      })
      .catch((err) => console.log(err));
  };
  getData();
});

function loadMore() {
  // console.log($(".product-frame"));
  $(".product-frame").hide();
  $(".product-frame").slice(0, 3).show();
}
