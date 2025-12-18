import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";
import ForgotPasswordRequest from "../models/forgotPasswordRequest.model.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const request = await ForgotPasswordRequest.create({
      id: uuidv4(),
      UserId: user.id,
    });

    const resetLink = `http://localhost:3000/password/resetpassword/${request.id}`;

    // Email service hook (Sendinblue later)
    console.log("RESET LINK:", resetLink);

    return res.status(200).json({
      message: "Password reset link generated",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await ForgotPasswordRequest.findOne({
      where: { id, isActive: true },
    });

    if (!request) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    return res.status(200).json({
      message: "Valid reset link",
      requestId: id,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { requestId, newPassword } = req.body;

    const request = await ForgotPasswordRequest.findOne({
      where: { id: requestId, isActive: true },
      include: User,
    });

    if (!request) {
      return res.status(400).json({ message: "Invalid or expired request" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    request.User.password = hashedPassword;
    await request.User.save();

    request.isActive = false;
    await request.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
