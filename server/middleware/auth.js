const jwt = require("jsonwebtoken")
const adminmodel = require("../models/admin")
/* create for check  user is authenticate or not */
exports.protect = async (req, res, next) => {

    try {
        let token;
        
        if (req.headers?.cookie) {
            /* get a jwt by cookie */
            token = req.headers?.cookie.split(";")[0].split("=")[1];
        }
        
        /* Comparing a cookie with secret key */
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const admin = await adminmodel.findOne({ _id: decode._id });
        req.user = admin;
        next();

    } catch (error) {
        res.status(500).send("Unautharized");
    }



}