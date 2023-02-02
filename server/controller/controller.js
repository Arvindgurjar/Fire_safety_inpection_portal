const Client = require("../models/client")


exports.createClient = async (req, res) => {
    const { client_name,
        client_email,
        client_password,
        client_city,
        client_state,
        client_address,
        client_phone,
        client_other_info,
        client_consultant_id } = req.body

    if (!client_name || !client_email || !client_password || !client_city || !client_state || !client_address || !client_phone || !client_other_info || !client_consultant_id) {
        res.status(400).send("Missing Data");
    }

    try {
        const user = await Client.findOne({ client_email })
        if (user) {
            res.status(400).send("User Already Exist");
        }
        const newuser = new Client(
            {
                client_name,
                client_email,
                client_password,
                client_city,
                client_state,
                client_address,
                client_phone,
                client_other_info,
                client_consultant_id
            })
        await newuser.save();
        res.status(201).send("User Created Successfully")

    } catch (error) {
        res.status(500).send(error)
    }
}


exports.editClient = async (req, res) => {
    const _id = req.params.id
   // console.log(_id)
    try {
        await Client.findByIdAndUpdate({ _id }, req.body)
        const updatedClient = await Client.findOne({ _id })
        res.status(201).send(updatedClient)
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.listClient = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(201).send(clients)
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.deleteClient = async (req, res) => {
    try {
        const _id = req.params.id
        await Client.findByIdAndDelete({ _id })
        res.status(201).send("Delete Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}



exports.deleteMultiClient = async (req, res) => {
    try {
        const { _ids}  = req.body
        console.log(_ids)
        if (_ids.length < 1) {
            res.status(400).send("Id Is Not Valid")
        }
        await Client.deleteMany({ _id: { $in: _ids } })
        res.status(201).send("Deleted Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}