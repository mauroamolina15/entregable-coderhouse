import { generateToken } from "../../../config/jwt/auth.js";
import { hash, isValidPassword } from "../../../utils/index.js";
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

  async toggleUserRole(user) {
    try {
      const { id } = user;
      const userExists = await this.getById(id);
      if (userExists && userExists.role === "user") {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { role: "premium" },
          { new: true }
        );
        return updatedUser;
      } else if (userExists && userExists.role === "premium") {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { role: "user" },
          { new: true }
        );
        return updatedUser;
      } else return false;
    } catch (err) {
      console.log(err);
    }
  }

  async resetPassword(user) {
    try {
      const userExist = await this.getByEmail(user);

      if (!userExist) return false;
      return generateToken(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePass(user, pass) {
    try {
      const isEqual = isValidPassword(pass, user);
      if (isEqual) return false;
      const newPass = hash(pass);
      await User.updateOne({ _id: user._id }, { password: newPass });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(user) {
    try {
      const userExist = await User.findById(user._id);
      if (!userExist) return false;
      const updateUser = await User.updateOne({ _id: user._id }, user);
      return updateUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateConnection(user) {
    try {
      const { id } = user;
      const userExist = await User.findById(id);
      if (userExist) {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        await User.updateOne(
          { _id: userExist._id },
          { lastConecction: threeHoursAgo }
        );
        return true;
      } else return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteOldUsers() {
    try {
      const currentTime = new Date(Date.now());
      const twoDaysAgo = new Date(currentTime - 48 * 60 * 60 * 1000);

      const deletedEmails = await User.find({
        lastConecction: { $lte: twoDaysAgo },
        role: "user",
      }).select("email");
      await User.deleteMany({
        lastConecction: { $lte: twoDaysAgo },
        role: "user",
      });

      return deletedEmails.map((data) => data.email);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const userExist = await User.findById(id);
      if (!userExist) return false;
      const deleteUser = await User.deleteOne({ _id: id });
      return deleteUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
