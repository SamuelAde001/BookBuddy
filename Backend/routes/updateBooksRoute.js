const express = require("express");
const books = require("../models/bookTrackedModel");

const router = express.Router();

// update Book details
router.put("/:id", async (req, res) => {
  const bookId = req.params.id;
  const { sittings, sittingsNumber, bookPages } = req.body;

  // Calculate the number of pages per sitting based on the total pages and number of sittings
  const pagesPerSitting = Math.ceil(bookPages / sittingsNumber);

  const sittingsArray = Array.from({ length: sittingsNumber }, () => ({
    pagePerSitting: pagesPerSitting,
    isComplete: false,
  }));

  const details = req.body;
  try {
    console.log(req.body);
    // Find the book by ID and update its details
    const updatedBook = await books.findOneAndUpdate(
      { _id: bookId },
      { ...details, sittings: sittings ? sittings : sittingsArray },
      { new: true }
    );

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
