require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const {connect} = require("./db/connect");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const usersRoute = require("./routes/uesrs");
const resetPassRoute = require("./routes/resetPass");
const passportRoute = require("./routes/passport");

app.use(express.json());
const corsOptions = {
    origin: ["https://notify-gorega-preview.onrender.com","http://localhost:3000"],
    origin: true,
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/",userRoute);
app.use("/",postRoute);
app.use("/",commentRoute);
app.use("/",usersRoute);
app.use("/",resetPassRoute)
app.use("/auth",passportRoute);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8000,async ()=>{
    try{
        await connect(process.env.CONNECTION_STRING);
        // connection handler
    }catch(err){
        // error handler
    }
})