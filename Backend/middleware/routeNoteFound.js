const routeNotFound = (req, res) => {
  // route not found function
  res.status(400).json({
    message: `Sorry ${req.url} does not exist, please check the route properly`,
  });
};

module.exports = { routeNotFound };
