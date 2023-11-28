import UserDao from "../persistence/daos/db/user.dao";

const userDao = new UserDao();

export const userPanel = async (req, res) => {
  try {
    const allUsers = await userDao.getAll();
    const users = allUsers.map((user) => ({
      id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      documents: user.documents,
      identification: user.identification,
      address: user.address,
      accountStatus: user.accountStatus,
      profilepic: user.avatar,
    }));
    res.render("admin-users", { users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await userDao.getById(id);
    user.role = role;
    await userDao.update(user);
    res.redirect("/admin/users");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    await userDao.deleteUser(id);

    res.redirect("/admin/users");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
