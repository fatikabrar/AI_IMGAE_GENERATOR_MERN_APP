import cors from "cors";
import express from "express";  
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import  GenerateImageRouter  from "./routes/GenerateImage.js";

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage",GenerateImageRouter);

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Fatik!!!" });
});

// Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL || process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Failed to connect to DB");
    console.error(err);
  }
};

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(8080, () => {
      console.log("🚀 Server started at port 8080");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();