const jwt = require("jsonwebtoken");
const JWD_SECRET_KEY = "Hello$@nDEE&";

const fetchuser = (req, res, next) =>{
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({errorr : "Access denied!!"});
    }

    try {
        const data = jwt.verify(token, JWD_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({errorr : "Access denied!!"});
    }

    
}

module.exports = fetchuser;