import express from "express";
import { sendOrderMail } from "./mailer.js";

const OrderController = express.Router();

OrderController.post("/confirm", async (req, res) => {
    console.log("REQ BODY --->", req.body);
  try {
    const { email, items, totalAmount } = req.body;

    if (!email || !items || !totalAmount) {
      return res.status(400).json({ message: "Missing order fields" });
    }

    const orderId = "ORD-" + Math.floor(Math.random() * 1000000);

    await sendOrderMail(email, {
      orderId,
      items,
      totalAmount,
    });

    res.status(200).json({
      message: "Order placed successfully. Email sent!",
      orderId,
    });

  } catch (error) {
    console.error("Order email error:", error);
    res.status(500).json({ message: "Failed to send order email" });
    console.log("BODY RECEIVED =>", req.body);

  }
});

export default OrderController;
