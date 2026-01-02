import express from "express";
import validate from "../middlewares/validate.middleware.js";
import { userValidation } from "../validations/index.js";
import * as userController from "../controllers/auth.controller.js";
const router = express.Router();

router.post(
  "/register",
  validate(userValidation.registerValidation),
  userController.signup
);

router.post(
  "/login",
  validate(userValidation.loginValidation),
  userController.login
);
router.post(
  "/send-otp",
  validate(userValidation.sendOtpSchema),
  userController.sendOtp
);    

router.post(
  "/verify-otp",
  validate(userValidation.verifyOtpSchema),
  userController.verifyOtp
);

router.post(
  "/forgot-password",
  validate(userValidation.forgotPasswordSchema),
  userController.forgotPassword
);

router.post(
  "/change-password",
  validate(userValidation.changePasswordSchema),
  userController.changePassword
);




export default router;
