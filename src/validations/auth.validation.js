import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("USER", "DRIVER", "ADMIN").required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required("Email is required"),
  password: Joi.string().required("Password is required"),
});


export const sendOtpSchema = Joi.object({
  email: Joi.string().email().required("Email is required"),
});

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required("Email is required"),
  otp: Joi.string().length(6).required("OTP is required"),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required("Email is required"),
  otp: Joi.string().length(6).required("OTP is required"),
  newPassword: Joi.string().min(6).required("New password must be at least 6 characters long"),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().message("Old password is required"),
  newPassword: Joi.string().min(6).required().message("New password must be at least 6 characters long"),
});
