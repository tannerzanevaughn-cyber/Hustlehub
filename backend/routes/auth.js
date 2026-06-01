const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findByEmail(value.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create(value.name, value.email, value.password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findByEmail(value.email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await User.verifyPassword(value.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email, rating: user.rating }, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
