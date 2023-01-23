const mongoose = require("mongoose")
DB = "mongodb://localhost:27017"
mongoose.connect(DB,()=>{console.log("Connected To Mongo Successfully")})
 