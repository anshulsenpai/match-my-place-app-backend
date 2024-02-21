const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connection Succesfull")).catch((e) => console.log("Connection Failed"))

module.exports = mongoose;