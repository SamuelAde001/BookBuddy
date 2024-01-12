const { default: mongoose } = require("mongoose");

const sittingsSchema = new mongoose.Schema({
  pagePerSitting: {
    type: Number,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const bookTrackedSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookPages: {
    type: Number,
    required: true,
  },
  sittings: [sittingsSchema],
  genre: {
    type: String,
    required: true,
  },
  dateOfBookInput: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
  imageLink: {
    type: String,
    trim: true,
  },
  dateFinishedReading: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
  },
});

const bookTracked = mongoose.model("bookTracked", bookTrackedSchema);

module.exports = bookTracked;
