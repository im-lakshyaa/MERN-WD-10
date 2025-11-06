import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const PORT = 3000;

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const email=req.body.email;
    const password=req.body.password;

    const hashPassword=await bcrypt.hash(password,10);
    const user =new User({email:email , password:hashPassword});
    
    const savedUSer = await user.save();
    res.status(201).json({ message: "user created sucessfully" });
    console.log(req.body);
  } catch (err) {
    console.log("error", err);
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
});

app.get("/allusers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "id not find" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
});

app.put("/allusers/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "something went wromg" });
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

//delete
app.delete("/allusers/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: user
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message
    });
  }
});


//login route
app.post("/login",async(req,res)=>{
  try{
    const {email,password}=req.body;

    const user= await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message:"user not found plese sign up first",
        isNewUser:true,
      })
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({
        message:"invalid password",
        isOldUser:true,
      })
    }
    res.status(200).json({
      message:"login successful",
      isOldUser:true,
      user:{email:user.email},
    });

  }catch(err){
    console.error("login error:",err);
    res.status(500).json({message:"internal server error "})
    
  }
})
app.listen(PORT, () => {
  console.log("server stared");
});
