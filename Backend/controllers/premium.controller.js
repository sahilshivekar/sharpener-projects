import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import crypto from "crypto";

export const createPremiumOrder = async (req, res, next) => {
  try {
    const orderId = crypto.randomUUID();

    const order = await Order.create({
      orderId,
      UserId: req.user.userId,
      status: "PENDING",
    });

    return res.status(201).json({
      orderId: order.orderId,
      message: "Premium order created",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPremiumPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId } = req.body;
    const userId = req.user.userId;

    const order = await Order.findOne({
      where: { orderId, UserId: userId },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Payment verification logic will be added later (Cashfree)
    order.paymentId = paymentId;
    order.status = "SUCCESS";
    await order.save();

    await User.update(
      { isPremium: true },
      { where: { id: userId } }
    );

    return res.status(200).json({
      message: "User upgraded to premium",
    });
  } catch (error) {
    next(error);
  }
};
