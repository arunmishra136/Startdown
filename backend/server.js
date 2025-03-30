import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Improved CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // ✅ Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Hash password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    // ✅ Create user
    let createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    // ✅ Generate JWT Token
    let token = jwt.sign({ email }, "shhhah", { expiresIn: "1d" });

    // ✅ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // True if using HTTPS
    });

    // ✅ Debugging logs
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);

    res.status(201).json({ success: true, user: createdUser });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: err.message });
  }
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
      return res.status(401).json({ message: "Incorrect password" });
    }

    let token = jwt.sign({ email }, "shhff", { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/login", (req,res)=>{
  res.send("user creadted successfully")
})

// 🚀 Logout Route
app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));