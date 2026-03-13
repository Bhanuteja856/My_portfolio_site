const express = require("express");
const router  = express.Router();
const Certificate = require("../models/Certificate");

// GET all
router.get("/", async (req, res) => {
  try {
    const data = await Certificate.find();
    res.json(data);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// POST single
router.post("/", async (req, res) => {
  try {
    const cert = new Certificate(req.body);
    await cert.save();
    res.json(cert);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// PUT / — bulk replace (used by admin dashboard)
router.put("/", async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [];
    await Certificate.deleteMany({});
    const inserted = items.length > 0 ? await Certificate.insertMany(items) : [];
    res.json(inserted);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// PUT /:id — update single
router.put("/:id", async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(updated);
  } catch(err) { res.status(500).json({ error: err.message }); }
});

// DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch(err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;