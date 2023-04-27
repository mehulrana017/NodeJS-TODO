import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setCookie(user, res, "Registerd Successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return next(new ErrorHandler("Invalid Email or Password", 404));

    setCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      maxAge: 0,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logout Successfully",
    });
};
