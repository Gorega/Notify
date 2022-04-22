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

app.use(express.json());
const corsOptions = {
    origin: ["https://notify-gorega.herokuapp.com","http://localhost:3000"],
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

app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8000,async ()=>{
    try{
        await connect(process.env.CONNECTION_STRING);
        console.log(`connect to db success on port ${process.env.PORT || 8000} !`)
    }catch(err){
        console.log(process.env.PORT)
        console.log(err);
    }
})