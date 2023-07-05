const socketClient = io();

const products = document.getElementById("products");
const form = document.getElementById("form");
const inputName = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputStatus = document.getElementById("status");
const inputCategory = document.getElementById("category");

socketClient.on("getProductsResponse", (array) => {
  let infoProducts = "";
  array.forEach((prod) => {
    // realmente no usaria el prod.id como id del elemento.
    infoProducts += `<li class="realTimeProduct-item" id=${prod.id}>${prod.title} - $${prod.price}</li>`;
  });
  products.innerHTML = infoProducts;
  const realTimeProducts = document.querySelectorAll(".realTimeProduct-item");

  realTimeProducts.forEach((item) => {
    item.addEventListener("click", deleteProduct);
  });
});

const deleteProduct = (e) => {
  const productElement = e.currentTarget;
  const productId = productElement.getAttribute("id");
  socketClient.emit("deleteProduct", productId);
};

const extractFieldValues = (fields) =>
  fields.reduce((values, field) => {
    values[field.name] = field.value;
    return values;
  }, {});

const clearForm = (fields) => {
  fields.forEach((field) => {
    field.value = "";
  });
};

form.onsubmit = (e) => {
  e.preventDefault();
  const fields = [
    inputName,
    inputPrice,
    inputDescription,
    inputCode,
    inputStock,
    inputStatus,
    inputCategory,
  ];
  const formData = extractFieldValues(fields);
  formData.thumbnails = [""];
  socketClient.emit("newProduct", formData);
  clearForm(fields);
};

socketClient.on("error", (msg) => {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#ED4337",
    },
  }).showToast();
});
