const path = "./src/daos/fs/users.json";

export default class FSUserDAO {
  constructor() {
    super(path);
  }

  async register(user) {
    try {
      console.log(`register ${user.email}`);
    } catch (err) {
      console.log(err);
    }
  }
}
