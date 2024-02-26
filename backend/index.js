// index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/customerFormDB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define schema for formData
const formDataSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  city: String,
  gender: String,
});

// Create mongoose model
const FormData = mongoose.model("FormData", formDataSchema);

// Save form data to database
app.post("/api/formdata", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(200).send("Form data saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving form data to database");
  }
});

app.get("/api/formdata", async (req, res) => {
  try {
    const formData = await FormData.find({}).exec();
    res.status(200).json(formData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching form data from database");
  }
});

// Update form data in the database
app.put("/api/formdata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, employeeId, city, gender } = req.body;

    const updatedFormData = await FormData.findByIdAndUpdate(
      id,
      { name, employeeId, city, gender },
      { new: true }
    );

    res.status(200).json(updatedFormData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating form data in database");
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
