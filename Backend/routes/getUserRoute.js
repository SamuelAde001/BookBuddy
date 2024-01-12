const express = require("express");
const { validationResult } = require("express-validator");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Get Specific user
router.get("/", async (req, res) => {
  try {
    // Getting user id from req
    const user_id = req.user._id;
    console.log(user_id);

    // Using async/await to wait for the user details to be fetched
    const presentUser = await user.findById(user_id).select("-password");

    // Checking if the user exists
    if (!presentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Sending the user details as a JSON response
    return res.status(200).json(presentUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
