const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = app => {

    const users = require("../controllers/appController");
    const verifyToken = require("../authsecurity/jwtAuth");
    const router = require("express").Router();
   
    router.post("/user/signup", use(users.signup));
    router.post("/user/login", use(users.signin)); 
    router.get("/users", use(users.list_all_users));

    router.post("/game/score",verifyToken, use(users.gamescore)); 
    router.post("/game/get-score",verifyToken, use(users.getgamescore)); 

    app.use('/api/fast-finger', router);
};  