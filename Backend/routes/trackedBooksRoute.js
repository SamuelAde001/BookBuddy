const express = require("express");
const books = require("../models/bookTrackedModel");

const router = express.Router();

// route to get all the unfinished books
router.get("/", async (req, res) => {
  try {
    // getting user id from req
    const user_id = req.user._id;

    const currentBooks = await books.find({
      user_id,
    });
    res.status(200).json(currentBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // making use of the user ID gotten from the req
    const user_id = req.user._id;
    const {
      author,
      bookName,
      bookPages,
      deadline,
      description,
      imageLink,
      genre,
      sittingsNumber,
    } = req.body;

    // Calculate the number of pages per sitting based on the total pages and number of sittings
    const pagesPerSitting = Math.ceil(bookPages / sittingsNumber);

    // Assign a default image link if imageLink is null or undefined
    const defaultImageLink = "https://fakeimg.pl/300x500?text=Book+Cover";
    const finalImageLink = imageLink || defaultImageLink;

    // Create sittings and push them into the array
    const sittingsArray = Array.from({ length: sittingsNumber }, () => ({
      pagePerSitting: pagesPerSitting,
      isComplete: false,
    }));

    const newTrackedBook = new books({
      author,
      bookName,
      bookPages,
      deadline,
      description,
      imageLink: finalImageLink,
      genre,
      sittings: sittingsArray,
      user_id,
    });

    // Save the new book
    const savedBook = await newTrackedBook.save();

    console.log("Book saved:", savedBook);
    res.status(200).json(savedBook);
  } catch (error) {
    console.error("Error creating new tracked book:", error);
    res.status(500).json({ message: "Error creating new tracked book", error });
  }
});

module.exports = router;
