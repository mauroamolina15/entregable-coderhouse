import UserDao from "../daos/db/user.dao.js";
import UserResDTO from "../dtos/user/userResDTO.js";

const userDao = new UserDao();

export default class UserRepository {
  constructor() {
    this.dao = userDao;
  }

  async getByIdDTO(id) {
    try {
      const response = await this.dao.getById(id);
      return new UserResDTO(response);
    } catch (error) {
      console.log(error);
    }
  }
}
