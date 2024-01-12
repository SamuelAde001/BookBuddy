const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  // if authorization is not found in the headers
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // split the authrization string into two bt the space and get the second element which is the token
  const token = authorization.split(" ")[1];

  // verify the token if it hasn't been tamperred with
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    // attach the id of the user to the request so it could be used later on in thequery
    req.user = await users.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
