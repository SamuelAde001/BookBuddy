const express = require("express");
const books = require("../models/bookTrackedModel");

const router = express.Router();

// route to get all the finished books
router.get("/", async (req, res) => {
  try {
    const user_id = req.user._id;
    const finishedBooks = await books.find({ isRead: true, user_id });
    res.status(200).json(finishedBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
