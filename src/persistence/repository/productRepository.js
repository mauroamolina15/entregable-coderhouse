import ProductDAO from "../daos/db/product.dao.js";
import ProductDTO from "../dtos/product/productReqDTO.js";
import ProductResDTO from "../dtos/product/productResDTO.js";

const prodDao = new ProductDAO();

export default class ProductRepository {
  constructor() {
    this.dao = prodDao;
  }

  async getByIdDTO(id) {
    try {
      const response = await this.dao.getProductById(id);
      return new ProductResDTO(response);
    } catch (error) {
      console.error(error);
    }
  }

  async createProdDTO(obj) {
    try {
      const prodDTO = new ProductDTO(obj);
      const response = await this.dao.createProduct(prodDTO);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
