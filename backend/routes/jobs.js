const router = require("express").Router();
const Job = require("../models/Job");
const { verifyToken } = require("../middleware/auth");
const Joi = require("joi");

const jobSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(10).required(),
  budget: Joi.number().positive().required(),
  location: Joi.string().required(),
  category: Joi.string().required()
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.getAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs", details: err.message });
  }
});

// Get job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job", details: err.message });
  }
});

// Create job (authenticated)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { error, value } = jobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = await Job.create(
      value.title,
      value.description,
      value.budget,
      value.location,
      value.category,
      req.userId
    );
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job", details: err.message });
  }
});

// Update job (authenticated)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.user_id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedJob = await Job.update(req.params.id, req.body);
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job", details: err.message });
  }
});

// Delete job (authenticated)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    if (job.user_id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Job.delete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job", details: err.message });
  }
});

module.exports = router;
