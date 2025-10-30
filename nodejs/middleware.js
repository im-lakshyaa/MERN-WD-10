// import express from 'express'

// const PORT =3000;
// const app=express();
// app.use(express.json());

// app.use((req,res,next)=>{
//     let role="admin"
//     let username="vikas"
//     let password="1234"

//     if(req.body.role===role && req.body.username===username && req.body.password===password){
//         console.log("middleone is called");
//         next()
//     }else{
//         res.send("invalid user");
//     }
// })

// app.use((req,res,next)=>{
//     console.log("middleware 2 called");
//     next();
// })

//  app.get("/",(req,res)=>{
//     res.send("hello form home page");
//  })

// app.post("/login",(req,res)=>{
//     console.log(req.body.username);
//     console.log(req.body.password);
//     res.send("done")

// })

//  app.listen(PORT,()=>{
//     console.log("helo from server");

//  })

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let role = "user";
let username = "lakshya";
let password = "12345678";


app.get("/login", (req, res) => {
  res.render("login", { error: null });
});



app.post("/login", (req, res, next) => {
  const { role: userRole, username: userName, password: userPass } = req.body;

  if (!userRole || !userName || !userPass || userPass.length < 6) {
    return res.send("sahi se details daal");
  }

  next();
});


app.post("/login", (req, res, next) => {
  const { role: userRole, username: userName, password: userPass } = req.body;

  if (userRole === role && userName === username && userPass === password) {
    next();
  } else {
    return res.send("invalid user");
  }
});


app.post("/login", (req, res) => {
  const { role } = req.body;

  if (role === "admin") {
    return res.redirect("/admin");
  } else if (role === "user") {
    return res.redirect("/user");
  } else {
    return res.send("aukaat m reh");
  }
});

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


//hyper media
//make api
