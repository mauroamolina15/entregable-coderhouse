import ProductManager from "./models/ProductManager.js";
import Product from "./models/Product.js";

const main = async () => {
  try {
    const productManager = new ProductManager("./products.json");
    console.log(await productManager.getProducts());
    const product1 = new Product(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    );
    await productManager.addProduct(product1);
    console.log(await productManager.getProducts());
    await productManager.addProduct(product1);
    await productManager.getProductById(1);
    await productManager.getProductById(3);
    await productManager.updateProduct(1, {
      title: "Producto prueba editado",
      thumbnail: "Test Thhumbss",
    });
    console.log(await productManager.getProducts());
    await productManager.deleteProduct(1);
    console.log(await productManager.getProducts());
    await productManager.deleteProduct(4);
  } catch (error) {
    console.log(`[Error!]: ${error.message}`);
  }
};

main();
