window.addEventListener("load", function () {
  const url = document.location.href;
  // split 메서드 참조 : https://hianna.tistory.com/377
  const urlIndex = Number(url.split("=")[1]);
  const detailImage = document.querySelector(".detail-image");
  const detailText = document.querySelector(".detail-text");

  // 3. 장바구니 데이터 세션 작성 요청 함수
  const requestCart = () => {
    // 수량 증가 및 합산 가격 출력
    // 1. DOM 객체 선택
    const countBtn = document.querySelectorAll(".qnts button"); // +, - 버튼
    const countEl = document.querySelector(".count"); // 카운팅 숫자 요소
    const sumEl = document.querySelector(".sum em"); // 가격 합산 요소

    // 2.
    const cartCountEl = document.querySelector(".cart-count");
    const cartSumEl = this.document.querySelector(".cart-sum");

    let count = Number(countEl.textContent); // 카운팅 숫자
    let sumPrice = Number(sumEl.textContent.replace(",", "")); // 합산 가격

    countBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.classList.contains("up")) {
          count++;
        } else {
          // 삼항 연산자 : 조건 ? 조건이 참일때 : 조건이 거짓일때
          count <= 1 ? (count = 1) : count--;
        }
        countEl.textContent = cartCountEl.value = count;
        sumEl.textContent = cartSumEl.value = (count * sumPrice)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    });

    const adtc = document.querySelector(".add-to-cart"); // 장바구니 버튼
    const formData = new FormData(document.querySelector(".cart-form")); // 장바구니 전달 데이터 폼

    adtc.addEventListener("click", async () => {
      formData.set("cart_count", `${count}`);
      formData.set("cart_sum", `${count * sumPrice}`);
      await this.fetch(
        "/soaply_backend/model/cart_ctrl.php?req_cart=add_cart",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((cart) => {
          // console.log(cart);
          this.alert(cart.msg);
          this.location.reload();
        })
        .catch((err) => console.log(err));
    });
  };

  const getDetailData = async () => {
    await fetch(`/soaply_backend/model/get_details.php?idx=${urlIndex}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let imageEl;
        let textEl;
        imageEl = `
          <img src="/soaply/images/products/${data.pro_img}" alt="">
        `;

        textEl = `
          <h2>${data.pro_name}</h2>
          <p>${data.pro_desc}</p>

          <span class="line"></span>

          <div class="price">
            <div class="price-title">
              <p>가격 :</p>
              <p>배송비 :</p>
            </div>
            <div class="price-value">
    <script src="/soaply/js/header.js"></script>
              <p>${data.pro_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
              <p>2,500원(3만원 이상 구매시 무료배송)</p>
            </div>
          </div> 
          
          <span class="line"></span>

          <div class="qnt-sum">
            <div class="qnts">
              <button class='down'>-</button>
              <strong class='count'>1</strong>
              <button class='up'>+</button>
            </div>
            <div class="sum">
              합계 : <em>${data.pro_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</em>원
            </div>
          </div>

          <div class="line"></div>
          
          <form onsubmit="return false" class="cart-form">
            <div class="detail-btns">
              <button class="common-btn add-to-cart" name="add_to_cart" type="submit">장바구니</button>
              <button class="common-btn">바로구매</button>
            </div>
            <!--1. -->
            <input type="hidden" name="cart_idx" value="${data.pro_idx}">
            <input type="hidden" name="cart_name" value="${data.pro_name}">
            <input type="hidden" name="cart_desc" value="${data.pro_desc}">
            <input type="hidden" name="cart_price" value="${data.pro_price}">
            <input type="hidden" name="cart_img" value="${data.pro_img}">
            <input type="hidden" name="cart_count" value="1" class="cart-count">
            <input type="hidden" name="cart_sum" value="${data.pro_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}" class="cart-sum">

          </form>
        `;
        detailImage.innerHTML = imageEl;
        detailText.innerHTML = textEl;

        requestCart(); // 3.
      })
      .catch((err) => console.log(err));
  };
  getDetailData();
});
