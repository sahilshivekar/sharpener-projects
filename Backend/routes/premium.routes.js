import express from "express";
import {
  createPremiumOrder,
  verifyPremiumPayment,
} from "../controllers/premium.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", authenticate, createPremiumOrder);
router.post("/verify", authenticate, verifyPremiumPayment);

export default router;
