const Product = require("../models/product")

/* For create a new product  */
exports.createProduct = async (req, res) => {
    //console.log(req.body)
    const { product_name,
        product_extinguisher_type,
        product_extinguisher_capacity,
        product_manufactured_date,
        product_due_date,
        product_remarks,
        product_client_id,
        product_consultant_id } = req.body

    if (!product_name || !product_extinguisher_type||!product_due_date||!product_manufactured_date || !product_extinguisher_capacity ||!product_remarks || !product_client_id || !product_consultant_id) {
        res.status(400).send("Missing Data");
    }

    try {
        const newproduct = new Product(
            {
                product_name,
                product_extinguisher_type,
                product_extinguisher_capacity,
                product_manufactured_date,
                product_due_date,
                product_remarks,
                product_client_id,
                product_consultant_id
            })
        await newproduct.save();
        res.status(201).send("User Created Successfully")

    } catch (error) {
        res.status(500).send(error)
    }
}

/* For edit info of product */
exports.editProduct = async (req, res) => {
    const _id = req.params.id
    // console.log(_id)
    try {
        await Product.findByIdAndUpdate({ _id }, req.body)
        const updatedProduct = await Product.findOne({ _id })
        res.status(201).send(updatedProduct)
    } catch (error) {
        res.status(500).send(error)
    }
}


/* for get all product info from mongo and send to frontend */
exports.listProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
}


/* foe deleting single product */
exports.deleteProduct = async (req, res) => {
    try {
        const _id = req.params.id
        await Product.findByIdAndDelete({ _id })
        res.status(201).send("Delete Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}


/* for deleting multiple product  */
exports.deleteMultiProduct = async (req, res) => {
    try {
        const { _ids } = req.body
        //console.log(_ids)
        if (_ids.length < 1) {
            res.status(400).send("Id Is Not Valid")
        }
        await Product.deleteMany({ _id: { $in: _ids } })
        res.status(201).send("Deleted Successfully");
    } catch (error) {
        res.status(500).send(error)
    }
}