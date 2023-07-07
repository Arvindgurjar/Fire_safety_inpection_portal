const adminmodel = require("../models/admin")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

/* for create a new admin registration */
exports.adminRegister = async (req, res) => {
    const { admin_email, admin_phone, admin_password } = req.body
    try {
        const new_admin = new adminmodel({
            admin_email, admin_phone, admin_password
        })

        new_admin.admin_password = await bcrypt.hash(new_admin.admin_password, 10);
        await new_admin.save();
        res.status(201).send("Admin created");

    } catch (error) {
        res.status(500).send(error);
    }
}
/* for create a admin login */
exports.adminLogin = async (req, res) => {
    //console.log(req.body)
    const admin_email = req.body.email
    const admin_password = req.body.password
    
    try {
        if (!admin_email || !admin_password) {
            res.status(400).send("Invalid Credentials")
        }
        const admin = await adminmodel.findOne({ admin_email });
        //console.log(admin)
        if (!admin) {
            res.status(404).send("User Not Found")
        }
        const pass_check = await bcrypt.compare(admin_password, admin.admin_password);
        if (pass_check) {
            const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY)
            //res.cookie("Admin", token, { expires:new Date(Date.now() +  (10 * 365 * 24 * 60 * 60)), httpOnly: true });
            res.status(200).send(JSON.stringify(token));
        } else {
            res.send(404).send("Invalid credential");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

/* For create for admin logout from backend */
exports.adminLogout = (req, res) => {
    //req.res.clearCookie("Admin");
    res.status(200).send("Logout Succesfully");
}