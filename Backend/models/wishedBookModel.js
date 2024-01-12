const { default: mongoose } = require("mongoose");

const wishedBookSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBookInput: {
    type: Date,
    default: Date.now,
  },
  imageLink: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
});

const bookWished = mongoose.model(
  "wishedBook",
  wishedBookSchema,
  "wishedBookCollection"
);

module.exports = bookWished;
