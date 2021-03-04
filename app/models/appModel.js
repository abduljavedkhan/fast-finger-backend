const dbCon = require('./db.js');
const QUERY = require('./dbquery');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const User = function (data) {
    this.user_name = data.user_name;
    this.email = data.email;
    this.password = data.password;
};

const Login = function (data) {
    this.email = data.email;
    this.password = data.password;
};

const Game = function (data) {
    console.log('plid ' + data.player_id)
    console.log('score ' + data.score)
    this.player_id = data.player_id;
    this.score = data.score;
};

//register user
User.createUser = (newUser, result) => {
    dbCon.query(QUERY.CHECK_USER_EXIST, [newUser.email], (err, res) => {
        if (err) {
            console.log('Error DB Service User Already Exist ', err);
            result(err, null);
        }
        if (res && res.length > 0) {
            console.log('DB Service : User Already Exist: ' + res.length);
            result(null, res.length)
        } else {
            dbCon.query(QUERY.CREATE_USER, newUser, (err, res) => {
                if (err) {
                    console.log('Error DB Service User Creation ', err);
                    result(err, null);
                }
                else {
                    console.log('DB Service User Created with Id ', res.insertId);
                    result(null, res.insertId);
                }
            });
        }
    });
};
//get all users
User.getAllUser = (result) => {
    dbCon.query(QUERY.ALL_USERS, (err, res) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
//login data
User.getLoginDetails = (login, result) => {
    dbCon.query(QUERY.LOGIN, [login.email, login.password], (err, res) => {
        if (err) {
            result(null, err);
        }
        else {
            console.log('DB Service Login Id '+ res[0].id );
            const accessToken = jwt.sign({ id: res[0].id }, config.secret, {
                expiresIn: 86400 // 24 hours
              });
            result(null, accessToken);
        }
    });
    
};
// game data update score
User.updateScore = (newScore, result) => {
            dbCon.query(QUERY.STORE_GAME_DATA, [newScore.player_id,newScore.score], (err, res) => {
                if (err) {
                    console.log('Error DB Service Score Updation ', err);
                    result(err, null);
                }
                else {
                    console.log('DB Service Score Updated with Id ', res.insertId);
                    result(null, res.insertId);
                }
            });
};
// game data get score
User.getScore = (player_id, result) => {
    console.log('db ' + player_id)
    dbCon.query(QUERY.GET_GAME_DATA, [player_id], (err, res) => {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res[0].score);
        }
    });
};


module.exports = { User, Login, Game };