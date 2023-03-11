const jwt = require("jsonwebtoken")
const adminmodel = require("../models/admin")

exports.protect = async (req, res, next) => {

    try {
        let token;
        //console.log(req.headers?.cookie)
        if (req.headers?.cookie) {
            token = req.headers?.cookie.split("=")[1];
        }
        //console.log(token)
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const admin = await adminmodel.findOne({ _id: decode._id });
        req.user = admin;
        next();

    } catch (error) {
        res.status(500).send("Unautharized");
    }



}