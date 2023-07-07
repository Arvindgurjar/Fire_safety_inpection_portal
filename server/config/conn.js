/* connection established with mongo */
const mongoose = require("mongoose")
DB = "mongodb://127.0.0.1:27017/Fire_safety_inspection_portal"
mongoose.connect(DB,()=>{console.log("Connected To Mongo Successfully")})
 