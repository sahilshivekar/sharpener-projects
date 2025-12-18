import express from "express";
import { forgotPassword, resetPasswordForm, updatePassword } from "../controllers/password.controller.js";

const router = express.Router();

router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:id", resetPasswordForm);
router.post("/updatepassword", updatePassword);

export default router;
