import { User } from "./models/user.model.js";

export default class UserDao {
  async registerUser(user) {
    try {
      const { email, password } = user;
      const existUser = await User.findOne({ email });
      if (!existUser) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          const newUser = await User.create({ ...user, role: "admin" });
          return newUser;
        }
        const newUser = await User.create(user);
        return newUser;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await User.findOne({ email, password });
      return userExist ? userExist : false;
    } catch (error) {
      console.log(error);
    }
  }
}
