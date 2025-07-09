// Importing required packages
import express from "express";
import mongoose from "mongoose";

// Initialize Express app
const app = express();
const port = 8000;

// MongoDB connection string (use .env in real apps)
const mongoURL = "";

// Middleware to parse JSON
app.use(express.json());

/**
 * Mongoose Schema Definition
 * Defines the structure of the "User" collection in MongoDB
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

// Create the Mongoose model
const User = mongoose.model("User", userSchema);

/**
 * Connect to MongoDB using Mongoose
 */
const connectDb = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};

// Basic route to test if server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server after DB is connected
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is live at http://localhost:${port}`);
  });
});
