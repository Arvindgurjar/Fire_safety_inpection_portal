const Inspector= require("../models/inspector")


exports.createInspector = async(req, res) => {
    console.log(req.body)
    const { inspector_name,
        inspector_email,
        inspector_password,
        inspector_city,
        inspector_state,
        inspector_address,
        inspector_phone,
        inspector_other_info,
        inspector_consultant_id } = req.body

    if (!inspector_name || !inspector_email || !inspector_password || !inspector_city || !inspector_state || !inspector_address || !inspector_phone || !inspector_other_info || !inspector_consultant_id) {
        res.status(400).send("Missing Data");
    }

    try {
        const user = await Inspector.findOne({ inspector_email })
        if (user) {
            res.status(400).send("User Already Exist");
        }
        const newuser = new Inspector(
            {
                inspector_name,
                inspector_email,
                inspector_password,
                inspector_city,
                inspector_state,
                inspector_address,
                inspector_phone,
                inspector_other_info,
                inspector_consultant_id
            })
           // console.log("dnjs");
        await newuser.save();
        res.status(201).send("User Created Successfully")

    } catch (error) {
        res.status(500).send(error)
    }
}


exports.editInspector = async (req, res) => {
    const _id = req.params.id
   // console.log(_id)
    try {
        await Inspector.findByIdAndUpdate({ _id }, req.body)
        const updatedInspector = await Inspector.findOne({ _id })
        res.status(201).send(updatedInspector)
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.listInspector = async (req, res) => {
    try {
        const inspectors = await Inspector.find();
        res.status(201).send(inspectors)
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.deleteInspector = async (req, res) => {
    try {
        const _id = req.params.id
        await Inspector.findByIdAndDelete({ _id })
        res.status(201).send("Delete Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.deleteMultiInspector = async (req, res) => {
    try {
        const { _ids}  = req.body
        //console.log(_ids)
        if (_ids.length < 1) {
            res.status(400).send("Id Is Not Valid")
        }
        await Inspector.deleteMany({ _id: { $in: _ids } })
        res.status(201).send("Deleted Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}