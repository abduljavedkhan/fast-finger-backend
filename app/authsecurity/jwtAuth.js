const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const ResponseBuilder = require('./../models/CustomResponse/ResponseBuilder');
const Response = require('./../models/CustomResponse/Response');
const MESSAGES = require('../models/CustomResponse/ResponseMessages');
const CODES = require('../models/CustomResponse/ResponseCode');
const STATUS = { SUCCESS: "true", FAIL: "false" };

verifyToken = (req, res, next) => {
  let token = req.headers["auth-token"];

  if (!token){
    let errorResponse = new ResponseBuilder();
    errorResponse.setStatusCode(CODES.UNAUTHENTICATED);
    errorResponse.setStatus(STATUS.FAIL);
    errorResponse.setMessage(MESSAGES.UNAUTHENTICATED);
    errorResponse.setData({});
    res.send(new Response(errorResponse));
  }else{

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){
      let errorResponse = new ResponseBuilder();
      errorResponse.setStatusCode(CODES.UNAUTHORIZED);
      errorResponse.setStatus(STATUS.FAIL);
      errorResponse.setMessage(MESSAGES.UNAUTHORIZED);
      errorResponse.setData({});
      res.send(new Response(errorResponse));
    }else{
    console.log('decodedid ' + decoded.userId)
  //  req.player_id = decoded.id;
    req.body.player_id = decoded.userId
    req.body = req.body;
    next();}
  });
}
};

module.exports = verifyToken;