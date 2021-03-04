const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log('decodedid ' + decoded.id)
  //  req.player_id = decoded.id;
    req.body.player_id = decoded.id
    req.body = req.body;
    next();
  });
};

module.exports = verifyToken;