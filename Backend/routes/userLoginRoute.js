const express = require("express");
const { validationResult, ExpressValidator } = require("express-validator");
const user = require("../models/userModel");
const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const createToken = (_id, firstName, surname, middleName, email) => {
  return jwt.sign(
    { _id, firstName, surname, middleName, email },
    process.env.SECRET,
    { expiresIn: "1d" }
  );
};

// register user
router.post(
  "/",
  [check("email").isEmail(), check("password").notEmpty()],
  (req, res) => {
    // handle user login
    const loginUser = async () => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const checkUserAlreadyExist = await user.findOne({ email });

      if (!checkUserAlreadyExist) {
        return res.status(400).json({
          message: `An account with ${email} does not exist`,
        });
      }

      const comparedPassword = await bcrypt.compare(
        password,
        checkUserAlreadyExist.password
      );
      if (!comparedPassword) {
        return res.status(400).json({ mesaage: "Sorry invalid credentials" });
      }

      const { _id, firstName, surname, middleName } = checkUserAlreadyExist;
      const token = createToken(_id, firstName, surname, middleName, email);
      res.json({
        firstName,
        surname,
        token,
      });
    };
    loginUser();
  }
);

module.exports = router;
