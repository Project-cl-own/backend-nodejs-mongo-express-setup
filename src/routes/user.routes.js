import express from "express";
import validate from "../middlewares/validate.middleware.js";
import { userValidation } from "../validations/index.js";
import userController from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate(userValidation.registerValidation),
  userController.register
);

router.post(
  "/login",
  validate(userValidation.loginValidation),
  userController.login
);


export default router;
