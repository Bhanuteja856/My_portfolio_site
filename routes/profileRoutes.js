const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// Get profile
router.get("/", async (req, res) => {
    const profile = await Profile.findOne();
    res.json(profile);
});

// Update profile
router.put("/", async (req, res) => {
    let profile = await Profile.findOne();

    if (!profile) {
        profile = new Profile(req.body);
    } else {
        Object.assign(profile, req.body);
    }

    await profile.save();
    res.json(profile);
});

module.exports = router;