import nodemailer from "nodemailer"; 
import dotenv from "dotenv";

dotenv.config();

export const sendOrderMail = async (email, orderData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lakshya2004182024@gmail.com",
        pass: "hdwv nkte trxa viiz",
      },
    });

    const { orderId, items, totalAmount } = orderData;

    const itemsList = items
      .map((i) => `${i.title} (x${i.quantity}) - $${i.price}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      text: `Thank you for your order!
      
Order ID: ${orderId}

Items:
${itemsList}

Total Amount: $${totalAmount}

Your order will be delivered soon!`,
    });

    console.log("Order email sent!");
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw new Error("Email sending failed");
  }
};
