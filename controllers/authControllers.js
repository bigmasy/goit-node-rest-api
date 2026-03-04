import User from "../db/models/User.js";
import * as authServices from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export const loginController = async (req, res) => {
  const result = await authServices.loginUser(req.body);
  res.json(result);
};

export const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.status(204).send();
};

export const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export const subscriptionController = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByPk(id);
  await user.update({ subscription });

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};
