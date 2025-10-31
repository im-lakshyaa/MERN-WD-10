import express from "express"
import mongoose from "mongoose"

const PORT=3000;

const app=express();

app.get("/",(req,res)=>{
    res.send("hello world")
})

mongoose.connect("mongodb+srv://lakshya20042004:2004l2004@e-com.ey0loag.mongodb.net/")
.then(()=>{
    console.log("mongodb connectd");
    
}).catch((err)=>{
    console.log(err);
    
})

app.listen(PORT,()=>{
    
})