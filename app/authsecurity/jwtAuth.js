const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const ResponseBuilder = require('./../models/CustomResponse/ResponseBuilder');
const Response = require('./../models/CustomResponse/Response');
const MESSAGES = require('../models/CustomResponse/ResponseMessages');
const CODES = require('../models/CustomResponse/ResponseCode');
const STATUS = { SUCCESS: "true", FAIL: "false" };

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    // return res.status(403).send({
    //   message: "No token provided!"
    // });
    let errorResponse = new ResponseBuilder();
    errorResponse.setStatusCode(CODES.UNAUTHENTICATED);
    errorResponse.setStatus(STATUS.FAIL);
    errorResponse.setMessage(MESSAGES.UNAUTHENTICATED);
    errorResponse.setData({});
    res.send(new Response(errorResponse));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      // return res.status(401).send({
      //   message: "Unauthorized!"
      // });
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.UNAUTHORIZED);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(MESSAGES.UNAUTHORIZED);
      errorResponse.setData({});
      res.send(new Response(errorResponse));
    }
    console.log('decodedid ' + decoded.id)
  //  req.player_id = decoded.id;
    req.body.player_id = decoded.id
    req.body = req.body;
    next();
  });
};

module.exports = verifyToken;