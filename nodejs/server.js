// //https modules...
// //server using http--> http-module-->createserver and listen (req,res)
// import { log } from "console";
// import http from "http";
// const Port=3000;

// const server =http.createServer((req,res)=>{
//     //req and respons handling ....using http
//     // console.log(req);
//     // console.log(req.body);
//     // console.log(req.url);
//     // console.log(req.method);
//     // res.setHeader("content-type","html/text");
//     // res.statusCode=200;

//     //creation of end point or routes using req.url
//     if(req.url == "/"){
//         res.end("hello from server");
//     }else if(req.url == "/home"){
//         res.end("hello from home page");
//     }else if(req.url == "/contact"){
//         res.end("hello from contact page");
//     }else{
//         res.statusCode="404";
//         res.end("page not found");
//     }


// // res.end("hello form Server");
// })

// server.listen(Port,()=>{
//     console.log("your server is running of localhost in port 3000");
    
// })

//server using express
// import express from "express"

// const PORT=3000;

// const server = express();

// //routes defination...
 
// server.get("/",(req,res)=>{
//     res.end("hi form server");
// });

// server.get("/home",(req,res)=>{
//     res.end("hi from home");
// })

// server.get("/about",(req,res)=>{
//     res.end("hi from about")
// })

// server.listen(PORT,()=>{
//     console.log("server started at port 3000");
    
// })


// import express from "express"
// import fs from "fs"
// import { title } from "process";
// const PORT =3000;

// const app=express();

// app.set("view engine","ejs");

// app.get("/",(req,res)=>{
//     res.end("hi from server")
// })

// app.get("/file",(req,res)=>{
//     //i will readfile using fs module async operation
//     fs.readFile("./file.html","utf-8",(err,data)=>{
//         if(err){
//             res.status(500).send("error in reading file");
//             return ;

//         }res.send(data);
//     })
// })



// app.get("/contact",(req,res)=>{
//     res.render("contact",{title:"server side rendering"})
// })


// app.listen(PORT,()=>{
//     console.log("server is running on 3000");
    
// })


// import express from "express"

// const PORT=3000;

// const app=express();

// app.set("view engine","ejs");

// app.get("/about",(req,res)=>{
//     res.render("about",{title:"server side rendering about page"})
// })

// app.get("/connect",(req,res)=>{
//     res.render("connect",{title:"server side rendering connect page"})
// })

// app.get("/",(req,res)=>{
//     res.render("contact",{title:"server side rendering contact page"})
// })

// app.get("/home",(req,res)=>{
//     res.render("home", {title:"server side rendering home page"})
// })

// app.listen(PORT,()=>{
//     console.log("server is running at 3000");
    
// })


import express from "express"

const PORT=3000;

const app=express();
app.use(express.json());

app.set("view engine","ejs");

app.post("/login",(req,res)=>{
    const {username,password}=req.body;
    console.log(req.body);
    
})
app.listen(PORT,()=>{
    console.log(req.body);
    
})


//CRUD operation 
//get 
//post
//put
//patch
//update
//delete

//read operation


