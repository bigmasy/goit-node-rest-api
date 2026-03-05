import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const avatarURL = gravatar.url(payload.email, {
    s: "250",
    r: "g",
    d: "identicon",
  });
  return User.create({ ...payload, password: hashPassword, avatarURL });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
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
