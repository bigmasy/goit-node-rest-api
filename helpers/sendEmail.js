import nodemailer from "nodemailer";
import "dotenv/config";

const { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASSWORD } =
  process.env;

const nodemailerConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (payload) => {
  const email = { ...payload, from: MAIL_USER };
  return transport.sendMail(email);
};

export default sendEmail;
