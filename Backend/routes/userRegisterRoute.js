const express = require("express");
const { validationResult, ExpressValidator } = require("express-validator");
const user = require("../models/userModel");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();

// create JSON web tokens to send to client
const createToken = (userDetails) => {
  return jwt.sign(userDetails, process.env.SECRET, { expiresIn: "1d" });
};

//get all users
router.get("/", (req, res) => {
  res.status(200).json(user.find({}));
});

//get Specific user
router.get("/", (req, res) => {
  // getting user id from req
  const user_id = req.user._id;

  res.status(200).json(user.find({}));
});

// register user
router.post(
  "/",
  [
    check("firstName").trim().notEmpty(),
    check("surname").trim().notEmpty(),
    check("middleName").trim(),
    check("email").isEmail(),
    check("password").notEmpty(),
  ],
  (req, res) => {
    // handle register user
    const registerUser = async () => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("passed first error");
      // extract the neccessary values from the body
      const { firstName, surname, middleName, email, password } = req.body;
      const checkUserAlreadyExist = await user.findOne({ email });
      if (checkUserAlreadyExist) {
        return res
          .status(400)
          .json({ message: `An account with ${email} already exist` });
      }
      const newUser = await user.create({
        firstName,
        surname,
        middleName,
        email,
        password,
      });

      const userDetails = {
        _id: newUser._id,
        firstName: newUser.firstName,
        surname: newUser.surname,
        middleName: newUser.middleName,
        email: newUser.email,
      };
      const token = createToken(userDetails);
      res.status(200).json({ firstName, surname, token });
    };
    registerUser();
  }
);

module.exports = router;
