import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthController from "../backend/authController.js";
import express from "express";
import OrderController from "./ordercontroller.js";
dotenv.config();
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.get("/",  (req, res) => {
    res.send("hello world");
})

app.use("/api/auth",AuthController)
app.use("/api/order", OrderController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
