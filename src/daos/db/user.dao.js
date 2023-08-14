import { hash, isValidPassword } from "../../utils/index.js";
import { User } from "./models/user.model.js";

export default class UserDao {
  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await User.findOne({ email });
      if (!existUser) {
        const isAdmin =
          email === "adminCoder@coder.com" && password === "adminCod3r123";
        const newUser = await User.create({
          ...user,
          role: isAdmin ? "admin" : "user",
          password: hash(password),
        });
        return newUser;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (!userExist) return false;
      return isValidPassword(password, userExist) ? userExist : false;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const userExists = await User.findById(id);
      return userExists ?? false;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExists = await User.findOne({ email });
      return userExists ?? false;
    } catch (error) {
      console.log(error);
    }
  }
}
