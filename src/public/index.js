document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelectorAll(".add-to-cart-btn");
  const cartLink = document.getElementById("cart");

  const cart = localStorage.getItem("cid");

  if (!cart) {
    fetch("http://localhost:8080/api/carts", { method: "POST" })
      .then((res) => res.json())
      .then((data) => localStorage.setItem("cid", data.payload._id))
      .catch((err) => console.log(err));
  }

  btn.forEach((btnEl) => {
    btnEl.addEventListener("click", () => {
      const productData = btnEl.dataset.product;

      fetch(`http://localhost:8080/api/carts/${cart}/product/${productData}`, {
        method: "POST",
      });
    });
  });

  cartLink.addEventListener("click", () => {
    window.location.href = `http://localhost:8080/api/views/cart/${cart}`;
  });
});
