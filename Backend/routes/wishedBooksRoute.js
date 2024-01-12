const express = require("express");
const wishedBook = require("../models/wishedBookModel");

const router = express.Router();

// find all wished books
router.get("/", async (req, res) => {
  try {
    const user_id = req.user._id;
    const wishedBooks = await wishedBook.find({ user_id });
    res.status(200).json(wishedBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", (req, res) => {
  try {
    // making use of the user ID gotten from the req
    const user_id = req.user._id;
    const { author, bookName, description, imageLink, genre } = req.body;

    // Assign a default image link if imageLink is null or undefined
    const defaultImageLink = "https://fakeimg.pl/300x500?text=Book+Cover";
    const finalImageLink = imageLink || defaultImageLink;

    const newTrackedBook = new wishedBook({
      author,
      bookName,
      description,
      imageLink: finalImageLink,
      genre,
      user_id,
    });
    newTrackedBook.save().then((savedBook) => {
      console.log("Book saved:", savedBook);
    });
    res.status(200).json(newTrackedBook);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
