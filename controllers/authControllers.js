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

export const verifyUserController = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);
  return res.status(200).json({ message: "Verification successful" });
};

export const resendVerificationController = async (req, res) => {
  const { email } = req.body;
  const result = await authServices.resendVerify(email);
  res.status(200).json({ message: "Verification email sent" });
};

export const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.status(204).send();
};

export const getCurrentController = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

export const subscriptionController = async (req, res) => {
  const { subscription } = req.body;

  const result = await authServices.updateSubscription(req.user, subscription);

  res.json(result);
};

export const updateAvatarController = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const avatarURL = await authServices.updateUserAvatar(req.user, req.file);

  res.json({
    avatarURL: avatarURL,
  });
};
