const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
    client_name:{
        type:String,
        required:true
    },
    client_email:{
        type:String,
        required:true,
        unique:true
    },
    client_password:{
        type:String,
        required:true,
        select:false
    },
    client_city:{
        type:String,
        required:true
    },
    client_state:{
        type:String,
        required:true
    },
    client_address:{
        type:String,
        required:true
    },
    client_phone:{
        type:String,
        required:true
    },
    client_other_info:{
        type:String,
        required:true
    },
    client_date:{
        type:Date,
        default:Date.now
    },
    client_consultant_id:{
        type:String,
        required:true
    }
})


const Client = new mongoose.model("clients",ClientSchema)

module.exports = Client;