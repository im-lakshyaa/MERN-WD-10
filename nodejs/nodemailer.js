import express from "express"
import nodemailer from "nodemailer"

const PORT=3000;
const app=express();

app.get("/",(req,res)=>{
    res.send("hello world")
})

console.log(nodemailer);

const transpoter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.ESMTP_USER,
        pass:process.env.ESMTP_PASS,
    },
});

const mailOpeartion ={
    from:"lakshya2004182024@gmail.com",
    to:"lakshya20042004@gmail.com",
    subject:"test Email from nodejs",
    text:"this is a test email sent from nodejs",
};

transpoter.sendMail(mailOpeartion,(error,ifo)=>{
    if(error){
        console.log(error);
        
    }else{
        console.log("email sent :+info.response");
        
    }
})

app.listen(PORT,()=>{
    console.log("hi from server");
    
})