const mongoose = require("mongoose")
DB = "mongodb://localhost:27017/Fire_safety_inspection_portal"
mongoose.connect(DB,()=>{console.log("Connected To Mongo Successfully")})
 