const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    admin_email: {
        type: String,
        require: true,
        unique: true,
        trim:true,
        validate(value){
            if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)))
            {
             throw new error("Invalid Email Address")
            }
         }

    },
    admin_phone: {
        type: String,
        require: true,
        unique: true,
        trim:true,
        validate(value) {
            if (!(/^[0-9]{10}$/).test(value)) {
                throw new error("Invalid UserName");
            }
        }
    },
    admin_password: {
        type: String,
        require: true,
        trim:true,
        validate(value){
            if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).test(value))
            {
                throw new error ("Password Is Not Strong")
            }
        }
    }

})
const admin = new mongoose.model("Admin",adminSchema);

module.exports = admin;