const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI);

const conn = mongoose.connection;

conn.once("open", () => {
console.log("✅ Database connected");
});

conn.on("error", (err) => {
console.log("❌ Database error:", err.message);
});

app.get("/", (req,res)=>{
res.send("Backend Running");
});


// ROUTES
const contactRoutes = require("./routes/contactRoutes");
const educationRoutes = require("./routes/educationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use("/api/messages", contactRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/profile", profileRoutes);


// LOAD ALL DATA
const Project = require("./models/Project");
const Education = require("./models/education");
const Experience = require("./models/Experience");
const Certificate = require("./models/Certificate");
const Profile = require("./models/Profile");

app.get("/api/portfolio", async(req,res)=>{

const projects = await Project.find();
const education = await Education.find();
const experience = await Experience.find();
const certificates = await Certificate.find();
const profile = await Profile.findOne();

app.get("/api/portfolio", async (req, res) => {
  try {

    const projects = await Project.find();
    const education = await Education.find();
    const experience = await Experience.find();
    const certificates = await Certificate.find();
    const profile = await Profile.findOne();

    res.json({
      projects: projects || [],
      education: education || [],
      experience: experience || [],
      certificates: certificates || [],
      profile: profile || {}
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
res.json({
projects,
education,
experience,
certificates,
profile
});

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
console.log(`🚀 Server running on port ${PORT}`);
});