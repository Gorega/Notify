const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    try{
        // verify token
        const token = req.cookies.token;
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_CODE);
        req.user = {
            userEmail:verifyToken.userEmail,
            username:verifyToken.username,
            userId:verifyToken.userId
        }
        next();
    }catch(err){
        return res.status(401).json({msg:"Unautorized"})
    }
}

module.exports = {auth};