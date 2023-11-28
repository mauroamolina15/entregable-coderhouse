import "dotenv/config";
import { env } from "process";
import { createTransport } from "nodemailer";
import UserDao from "../persistence/daos/db/user.dao";

const userDao = new UserDao();

export const transporter = createTransport({
  service: "gmail",
  // host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const createMsgRegister = (first_name) => {
  return `<h1>Hola ${first_name}, ¡Bienvenido/a a iaPedrosa Shop!</h1>`;
};

const createMsgReset = (first_name, token) => {
  return `<h1>Hola ${first_name}, ¡Hacé click 
    <a href='https://test/new-pass?tok=${token}'>AQUI</a> 
    para restablecer tu contraseña!</h1>`;
};

const premiumRemoveProduct = (first_name, product) => {
  return `<h1>Hola ${first_name}, Tu producto ${product} fue eliminado de la tienda</h1>`;
};

export const sendMailaccountDeletedForInactivity = async (user) => {
  try {
    const gmailOptions = {
      from: env.EMAIL,
      to: user,
      subject: "Tu cuenta fue eliminada",
      html: `<h1>Hola , tu cuenta fue eliminada por inactividad</h1>`,
    };

    await transporter.sendMail(gmailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendMail = async (user, service, token) => {
  try {
    const usuario = await userDao.getByEmail(user);

    const { first_name, email } = usuario;

    let msg = "";
    service === "register"
      ? (msg = createMsgRegister(first_name))
      : service === "resetPass"
      ? (msg = createMsgReset(first_name, token))
      : (msg = "");
    service === "premiumRemoveProduct"
      ? (msg = premiumRemoveProduct(first_name, token))
      : (msg = "");

    let subj = "";
    subj =
      service === "register"
        ? "Bienvenido/a"
        : service === "resetPass"
        ? "Restablecimiento de contraseña"
        : "";
    service === "premiumRemoveProduct"
      ? (subj = "Tu producto fue eliminado")
      : (subj = "");

    const gmailOptions = {
      from: env.EMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    const response = await transporter.sendMail(gmailOptions);

    if (token !== null) return token;
  } catch (error) {
    throw new Error(error.message);
  }
};
