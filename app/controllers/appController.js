const { User, Login, Game } = require('../models/appModel.js');
const ResponseBuilder = require('./../models/CustomResponse/ResponseBuilder');
const Response = require('./../models/CustomResponse/Response');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const MESSAGES = require('../models/CustomResponse/ResponseMessages');
const CODES = require('../models/CustomResponse/ResponseCode');
const STATUS = { SUCCESS: "true", FAIL: "false" };

const validateRequest = require('./../models/ValidateRequest/ValidateRequest');

exports.signup = (req, res) => 
{
    let new_user = new User(req.body);
    if (!validateRequest([new_user.user_name, new_user.email, new_user.password]))
     {
        let errorResponse = new ResponseBuilder();
        errorResponse.setStatusCode(CODES.BAD_REQUEST);
        errorResponse.setStatus(STATUS.FAIL);
        errorResponse.setMessage(MESSAGES.INCOMPLETE_REQUEST);
        errorResponse.setData({});
        res.send(new Response(errorResponse));
    }
    User.createUser(new_user, (err, result) => {
        console.log('Controller: Register User ');
        if (err) {
            if(err.type === "exist"){
                let userExistResponse = new ResponseBuilder();
                userExistResponse.setStatusCode(CODES.NOT_ALLOWED);
                userExistResponse.setStatus(STATUS.FAIL);
                userExistResponse.setMessage(MESSAGES.USER_EXIST);
                userExistResponse.setData({});
                res.send(new Response(userExistResponse));
            }else{
            let errorResponse = new ResponseBuilder();
            errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
            errorResponse.setStatus(STATUS.FAIL);
            errorResponse.setMessage(err.message);
            errorResponse.setData({});
            res.send(new Response(errorResponse));
            }
        }else{
            console.log('result ' + result.UserId)
            let successResponse = new ResponseBuilder();
            successResponse.setStatusCode(CODES.SUCCESS);
            successResponse.setStatus(STATUS.SUCCESS);
            successResponse.setMessage(MESSAGES.USER_CREATED_SUCCESS);
            successResponse.setData(result.UserId);
            res.send(new Response(successResponse));
        }
    });
};

exports.signin = (req, res) => {
    let login = new Login(req.body);
    if (!validateRequest([login.email, login.password])) {
        let errorResponse = new ResponseBuilder();
        errorResponse.setStatusCode(CODES.BAD_REQUEST);
        errorResponse.setStatus(STATUS.FAIL);
        errorResponse.setMessage(MESSAGES.INCOMPLETE_REQUEST);
        errorResponse.setData({});
        res.send(new Response(errorResponse));
    }
    User.getLoginDetails(login, (err, result) => {
        console.log('Controller: get Login Details ');
        if (err) {
            if (err.type === "not_found") {
                let errorResponse = new ResponseBuilder();
                errorResponse.setStatusCode(CODES.NOT_FOUND);
                errorResponse.setStatus(STATUS.FAIL);
                errorResponse.setMessage(MESSAGES.NOT_FOUND);
                errorResponse.setData({});
                res.send(new Response(errorResponse));
            } else {
                let errorResponse = new ResponseBuilder();
                errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
                errorResponse.setStatus(STATUS.FAIL);
                errorResponse.setMessage(err.message);
                errorResponse.setData({});
                res.send(new Response(errorResponse));
            }
        }
        else {
            const data = {
                accessToken: jwt.sign({ userId: result.userId, email: result.email, username: result.username }, config.secret, {
                    expiresIn: 86400 // 24 hours
                  })
            }
            let successResponse = new ResponseBuilder();
            successResponse.setStatusCode(CODES.SUCCESS);
            successResponse.setStatus(STATUS.SUCCESS);
            successResponse.setMessage(MESSAGES.USER_DETAILS);
            successResponse.setData(data);
            res.send(new Response(successResponse));
        }
    });
};

exports.list_all_users = (req, res) => {
    User.getAllUser((err, result) => {
        console.log('Controller: getAllUser ');
        if (err) {
            let errorResponse = new ResponseBuilder();
            errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
            errorResponse.setStatus(STATUS.FAIL);
            errorResponse.setMessage(err.message);
            errorResponse.setData({});
            res.send(new Response(errorResponse));
        }else{
        let successResponse = new ResponseBuilder();
        successResponse.setStatusCode(CODES.SUCCESS);
        successResponse.setStatus(STATUS.SUCCESS);
        successResponse.setMessage(MESSAGES.USER_DETAILS);
        successResponse.setData(result);
        res.send(new Response(successResponse));}
    });
};

exports.gamescore = (req, res) => {
    const scoreReq = {
        player_id: req.body.player_id,
        score: req.body.score
    }
    User.updateScore(scoreReq, (err, result) => {
        console.log('Controller: update Score Details ');
        if (err) {
            let errorResponse = new ResponseBuilder();
            errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
            errorResponse.setStatus(STATUS.FAIL);
            errorResponse.setMessage(err.message);
            errorResponse.setData({});
            res.send(new Response(errorResponse));
        }else{
        let successResponse = new ResponseBuilder();
        successResponse.setStatusCode(CODES.SUCCESS);
        successResponse.setStatus(STATUS.SUCCESS);
        successResponse.setMessage(MESSAGES.SCORE);
        successResponse.setData(result.gameId);
        res.send(new Response(successResponse));}
    });
};

exports.getgamescore = (req, res) => {
    User.getScore(req.body.player_id, (err, result) => {
        console.log('Controller: get Score Details ');
        if (err) {
            if (err.type === "not_found") {
                let errorResponse = new ResponseBuilder();
                errorResponse.setStatusCode(CODES.NOT_FOUND);
                errorResponse.setStatus(STATUS.FAIL);
                errorResponse.setMessage(MESSAGES.NOT_FOUND);
                errorResponse.setData({});
                res.send(new Response(errorResponse));
            } else {
            let errorResponse = new ResponseBuilder();
            errorResponse.setStatusCode(CODES.INTERNAL_SERVER_ERROR);
            errorResponse.setStatus(STATUS.FAIL);
            errorResponse.setMessage(err.message);
            errorResponse.setData({});
            res.send(new Response(errorResponse));}
        }else{
        const data = {
            score: result.score
        }
        let successResponse = new ResponseBuilder();
        successResponse.setStatusCode(CODES.SUCCESS);
        successResponse.setStatus(STATUS.SUCCESS);
        successResponse.setMessage(MESSAGES.SCORE_DETAILS);
        successResponse.setData(data);
        res.send(new Response(successResponse));}
    });
};

