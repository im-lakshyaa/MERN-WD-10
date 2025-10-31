import express from "express";
import multer from "multer";
const PORT = 3000;

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/login",
  upload.fields([
    { name: "dp" },
    { name: "avtar" },
    { name: "file"},
  ]),
  (req, res) => {
    console.log(req.files);
    res.end("file uploaded successfully");
  }
);
app.listen(PORT, () => {
  console.log("server is running");
});
