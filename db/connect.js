const mongoose = require("mongoose");

const connect = (connectionString)=>{
    const connect = mongoose.connect(connectionString);
    return connect;
}

module.exports = {connect};