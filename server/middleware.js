const jwt = require('jsonwebtoken');
const {USER_JWT_PASSWORD} = require("./config")


function auth(req, res, next){
    const token = req.cookies.token
    // console.log("Token", token)
    if(!token){
        return res.json({
            message : "No token provided, please login"
        })
    }
    try{
        const decode = jwt.verify(token, USER_JWT_PASSWORD)
        req.user= decode
        // console.log(req.user)
        next()
    }catch(error){
        res.status(404).json({
            message: "Token invalid please login "
        })
    }
}


module.exports = {
    auth,
   
}