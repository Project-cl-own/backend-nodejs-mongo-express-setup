import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../validations/auth.validation.js";
import db from "../models/index.js";
import dotenv from "dotenv"
import {
  sendOtpSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  changePasswordSchema,
} from "../validations/auth.validation.js";
import { generateOtp } from "../utils/otp.js";
dotenv.config()

const UserModel = db.auth;
const generateUserCode = (role) => {
  const num = Math.floor(100000 + Math.random() * 900000);
  if (role === "USER") return `USR${num}`;
  if (role === "DRIVER") return `DRI${num}`;
  if (role === "ADMIN") return `ADM${num}`;
};

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1, message: error.message });

    const { name, email, password, role } = req.body;

    const exists = await UserModel.findOne({ where: { email } });
    if (exists) return res.status(400).json({ status: 1, message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hash,
      role,
      user_code: generateUserCode(role),
    });

    return res.status(201).json({
      status: 0,
      status_code: 201,
      message: "Signup successful",
      data: { id: user.id, user_code: user.user_code, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ status: 1, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1, message: error.message });

    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ status: 1, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ status: 1, message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, user_code: user.user_code },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.status(200).json({
      status: 0,
      status_code: 200,
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return res.status(500).json({ status: 1, message: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { error } = sendOtpSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1, message: error.message });

    const { email } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ status: 1, message: "User not found" });

    const otp = generateOtp();
    const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);

    await user.update({ otp, otp_expires: expiry });

    // TODO: integrate email/SMS service here
    console.log(`OTP for ${email}: ${otp}`);

    return res.json({ status: 0, message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ status: 1, status_code: 500, message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { error } = verifyOtpSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1,   message: error.message });

    const { email, otp } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user || !user.otp) return res.status(400).json({ status: 1, message: "OTP not requested" });

    if (user.otp !== otp) return res.status(400).json({ status: 1, message: "Invalid OTP" });

    if (user.otp_expires < new Date())
      return res.status(400).json({ status: 1, message: "OTP expired" });

    return res.json({ status: 0, message: "OTP verified successfully" });
  } catch (err) {
    return res.status(500).json({ status: 1, message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1, message: error.message });

    const { email, otp, newPassword } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ status: 1, message: "User not found" });

    if (user.otp !== otp || user.otp_expires < new Date())
      return res.status(400).json({ status: 1, message: "Invalid or expired OTP" });

    const hash = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hash, otp: null, otp_expires: null });

    return res.json({ status: 0, message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ status: 1, message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ status: 1, message: error.message });

    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await user.findByPk(userId);
    if (!user) return res.status(404).json({ status: 1, message: "User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ status: 1, message: "Old password incorrect" });

    const hash = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hash });

    return res.json({ status: 0, message: "Password changed successfully" });
  } catch (err) {
    return res.status(500).json({ status: 1, message: err.message });
  }
};