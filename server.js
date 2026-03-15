// ── IMPORT PACKAGES ─────────────────────────────

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ── APP SETUP ───────────────────────────────────
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ── CONNECT TO MONGODB ──────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.log("❌ MongoDB connection error:", err.message)
  );

// ── ROUTES ──────────────────────────────────────
app.use("/api/messages", require("./routes/messages"));
app.use("/api/education", require("./routes/educationRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

// ── IMPORT MODELS ───────────────────────────────
const Project = require("./models/Project");
const Education = require("./models/education");
const Experience = require("./models/Experience");
const Certificate = require("./models/Certificate");
const Profile = require("./models/Profile");

// ── PORTFOLIO API (Load all data) ───────────────
app.get("/api/portfolio", async (req, res) => {
  try {
    const [projects, education, experience, certificates, profile] =
      await Promise.all([
        Project.find(),
        Education.find(),
        Experience.find(),
        Certificate.find(),
        Profile.findOne(),
      ]);

    res.json({
      projects: projects || [],
      education: education || [],
      experience: experience || [],
      certificates: certificates || [],
      profile: profile || {},
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── ROOT ROUTE ──────────────────────────────────
app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});
const path = require('path');

// Tell Express to serve the static files from your frontend folder
// (Change 'public' to whatever your HTML folder is named)
app.use(express.static(path.join(__dirname, 'public')));

// Send your index.html file when someone visits the main link
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── SERVER START ────────────────────────────────
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running at Connected`);
});
