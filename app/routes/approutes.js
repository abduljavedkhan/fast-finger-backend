module.exports = app => {
    const users = require("../controllers/appController.js");
    const verifyToken = require("../authsecurity/jwtAuth");
    const router = require("express").Router();
    
    router.post("/user/signup", users.signup);
    router.post("/user/login", users.signin); 
    router.get("/users", users.list_all_users);

    router.post("/game/score",verifyToken, users.gamescore); 
    router.post("/game/get-score",verifyToken, users.getgamescore); 

    app.use('/api/fast-finger', router);
};  