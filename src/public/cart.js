let products = document.getElementById("products");

const cart = localStorage.getItem("cid");
fetch(`http://localhost:8080/api/carts/${cart}`)
  .then((res) => res.json())
  .then((data) => {
    let infoProducts = "";
    data.products.forEach((prod) => {
      infoProducts += `<li>${prod.product.title} - $${prod.product.price} - (${prod.quantity})</li>`;
    });
    products.innerHTML = infoProducts;
  });
