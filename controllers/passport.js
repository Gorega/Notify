const passport = require("passport");
const User = require("../models/user");
const JWT = require("jsonwebtoken");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user,done)=>{
    return done(null,user._id)
})

passport.deserializeUser((_id,done)=>{
    User.findById({_id},(err,user)=>{
        if(err){
            return;
        }
        return done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    callbackURL: "https://notify-gorega.herokuapp.com/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOne({googleId:profile.id});
    if(!user){
        try{
            const newUser = await User.create({googleId:profile.id,email:profile.emails[0].value,username:profile.name.familyName,prfile_img:profile.photos[0].value});
            return done(null,newUser);
        }catch(err){
            return done(null,false)
        }
    }
    return done(null,user);
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://notify-gorega.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'photos', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOne({facebookId:profile.id});
    if(!user){
        try{
            const newUser = await User.create({facebookId:profile.id,email:profile.emails[0].value,username:profile.name.familyName,prfile_img:profile.photos[0].value});
            return done(null,newUser);
        }
        catch(err){
            return done(null,false)
        }
    }
    return done(null,user);
  }

));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://notify-gorega.herokuapp.com/auth/github/callback",
    scope:['user:email']
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await User.findOne({githubId:profile.id});
    if(!user){
        try{
            const newUser = await User.create({githubId:profile.id,email:profile.emails[0].value,username:profile.username,prfile_img:profile.photos[0].value});
            return done(null,newUser);
        }
        catch(err){
            return done(null,false)
        }
    }
    return done(null,user);
  }

));

const signUser = (req,res)=>{
    const {_id,email,username} = req.user
    // create token
    const token = JWT.sign({userId:_id,userEmail:email,username:username},process.env.JWT_SECRET_CODE,{expiresIn:process.env.JWT_EXPIRE});
    // set cookie
    res.cookie("token",token,{
        httpOnly:true,
        useCredentials: false,
        maxAge: 1000 * 3600 * 24 * 30 * 1
    })
    res.cookie("signed",true,{
        maxAge: 1000 * 3600 * 24 * 30 * 1
    })
    return res.redirect("https://notify-gorega.herokuapp.com")
}

const failureRedirect = (req,res)=>{
    setTimeout(()=>{
        return res.redirect("https://notify-gorega.herokuapp.com")
    },3000)
    return res.send("User with the same email and information is already exist, please login with different method")
}

module.exports = {signUser,failureRedirect}