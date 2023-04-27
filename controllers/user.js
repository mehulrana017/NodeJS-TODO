import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../routes/utils/features.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  setCookie(user, res, "Registerd Successfully");
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  setCookie(user, res, `Welcome back, ${user.name}`, 200);
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
    })
    .json({
      success: true,
      message: "logout Successfully",
    });
};
