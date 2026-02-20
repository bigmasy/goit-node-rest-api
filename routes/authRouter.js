import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authLoginSchema, authRegisterSchema } from "../schemas/authSchemas.js";
import { updateSubscriptionSchema } from "../schemas/subscriptionUpdateSchemas.js";
import {
  getCurrentController,
  loginController,
  logoutController,
  registerController,
  subscriptionController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController,
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  subscriptionController,
);
export default authRouter;
