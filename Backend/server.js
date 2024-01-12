const express = require("express");
const { connectDB } = require("./config/dbConnect");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const trackedBooksRoute = require("./routes/trackedBooksRoute");
const wishedBooksRoute = require("./routes/wishedBooksRoute");
const userRegisterRoute = require("./routes/userRegisterRoute");
const loginUserRoute = require("./routes/userLoginRoute");
const readBooksRoute = require("./routes/readBooksRoute");
const updateBooksRoute = require("./routes/updateBooksRoute");
const deleteBooksRoute = require("./routes/deleteBooksRoute");
const deleteWishedBooksRoute = require("./routes/deleteWishedBook");
const updateWishedBooksRoute = require("./routes/updateWishedBooksRoute");
const getUserRoute = require("./routes/getUserRoute");
const requireAuth = require("./middleware/requireAuth");
const { routeNotFound } = require("./middleware/routeNoteFound");

// middwares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// routes
app.get("/", (req, res) => {
  res.send("on the root");
});

app.use("/loginuser", loginUserRoute);
app.use("/registeruser", userRegisterRoute);

// authentication check middleware
app.use(requireAuth);
app.use("/trackedbooks", trackedBooksRoute);
app.use("/wishedbooks", wishedBooksRoute);
app.use("/readbooks", readBooksRoute);
app.use("/updatebooks", updateBooksRoute);
app.use("/deletebooks", deleteBooksRoute);
app.use("/deletewishedbooks", deleteWishedBooksRoute);
app.use("/updatewishedbooks", updateWishedBooksRoute);
app.use("/getuser", getUserRoute);
app.use(routeNotFound);
// Start application/Server
const server = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server live at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
