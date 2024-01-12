const express = require("express");
const books = require("../models/bookTrackedModel");

const router = express.Router();

// update Book details
router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    // Find the book by ID and update its details
    const updatedBook = await books.findOneAndDelete({ _id: bookId });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
