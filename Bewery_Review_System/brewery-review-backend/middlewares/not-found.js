const notFoundMiddleware = (req, res) =>
    res.status(404).send("Route doesn't Exists");
  
  module.exports= notFoundMiddleware;
  // module.exports = errorHandlerMiddleware;