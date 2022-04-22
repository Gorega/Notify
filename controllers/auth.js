const JWT = require("jsonwebtoken");

const auth = (req,res,next)=>{
    try{
        // verify token
        const authHeaders = req.headers.authorization;
        const cookieToken = req.cookies.token;
        const token = authHeaders.split(" ")[1];
        const verifyCookieToken = JWT.verify(cookieToken,process.env.JWT_SECRET_CODE);
        const verifyToken = JWT.verify(token,process.env.JWT_SECRET_CODE);
        if(verifyCookieToken && verifyToken){
            req.user = {
                userEmail:verifyCookieToken.userEmail,
                username:verifyCookieToken.username,
                userId:verifyToken.userId
            }
            next();
        }
    }catch(err){
        res.clearCookie("token")
        return res.status(401).json({msg:"Unautorized"})
    }
}

module.exports = {auth};