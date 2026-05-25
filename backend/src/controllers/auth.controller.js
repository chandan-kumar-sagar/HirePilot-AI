import User from "../models/User.model.js";

import { registerSchema } from "../validations/auth.validation.js";

import { hashPassword } from "../services/auth/password.service.js";

import { generateToken } from "../services/auth/token.service.js";

export const registerUser = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { fullName, email, password } =
      validatedData;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await hashPassword(password);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user._id,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { loginSchema } from "../validations/auth.validation.js";

import { comparePassword } from "../services/auth/password.service.js";

export const loginUser = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatched =
      await comparePassword(
        password,
        user.password
      );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: user._id,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};