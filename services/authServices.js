import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

export const findUser = (where) => User.findOne({ where });

const createVerifyEmail = ({ to, verificationCode }) => ({
  to,
  subject: "Verify email",
  html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`,
});

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const avatarURL = gravatar.url(payload.email, {
    s: "250",
    r: "g",
    d: "identicon",
  });
  const verificationToken = uuidv4();
  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
    verify: false,
    verificationToken,
  });
  const verifyEmail = createVerifyEmail({
    to: newUser.email,
    verificationCode: newUser.verificationToken,
  });
  await sendEmail(verifyEmail);
  return newUser;
};

export const resendVerify = async (email) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(404, "User not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");
  if (!user.verificationToken) {
    const verificationToken = uuidv4();
    await user.update({ verificationToken });
  }
  const verifyEmail = createVerifyEmail({
    to: user.email,
    verificationCode: user.verificationToken,
  });
  await sendEmail(verifyEmail);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  if (!user.verify) throw HttpError(401, "Email not verified");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const payload = {
    id: user.id,
  };
  const token = createToken(payload);
  await user.update({ token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) throw HttpError(404, "User not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");
  return user.update({ verificationToken: null, verify: true });
};

export const logoutUser = (user) => {
  return user.update({ token: null });
};

export const updateSubscription = async (user, subscription) => {
  await user.update({ subscription });
  return { email: user.email, subscription: user.subscription };
};

export const updateUserAvatar = async (user, file) => {
  const newPath = path.resolve("public", "avatars", file.filename);
  await fs.rename(file.path, newPath);
  const avatarURL = path.join("avatars", file.filename);
  await user.update({ avatarURL });
  return user.avatarURL;
};
