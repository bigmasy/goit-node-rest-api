import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authLoginSchema,
  authRegisterSchema,
  resendVerificationSchema,
} from "../schemas/authSchemas.js";
import { updateSubscriptionSchema } from "../schemas/subscriptionUpdateSchemas.js";
import * as authController from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authController.registerController,
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authController.loginController,
);
authRouter.get(
  "/verify/:verificationToken",
  authController.verifyUserController,
);

authRouter.post(
  "/verify",
  validateBody(resendVerificationSchema),
  authController.resendVerificationController,
);

authRouter.post("/logout", authenticate, authController.logoutController);

authRouter.get("/current", authenticate, authController.getCurrentController);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authController.subscriptionController,
);
export default authRouter;

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarController,
);
