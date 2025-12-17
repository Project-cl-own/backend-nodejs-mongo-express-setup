import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authService.createUser({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken({
      id: user._id,
      email: user.email
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token:token
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    // 🔐 CREATE JWT TOKEN
    const token = generateToken({
      id: user._id,
      email: user.email
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token:token
      }
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login
};
