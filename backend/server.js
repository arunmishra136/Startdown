import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {createServer} from "http";

const app = express();
const httpServer = createServer(app);



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Improved CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow both localhost and 127.0.0.1
    credentials: true, // Allow cookies
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// 🚀 Register Route
app.post("/register", async (req, res) => {
  let {name, email, password} =req.body;

  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt, async(err, hash)=>{
      let createdUser = await User.create({
        name,
        email,
        password: hash
      })

      let token = jwt.sign({email}, "shhhah");
      res.cookie("token",token);

      res.send(createdUser);
    })
  })
  
});

// 🚀 Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password"});
    }

    let token=jwt.sign({email},"shhff");
    res.cookie("token",token);
    res.send(user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

// 🚀 Logout Route
app.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
