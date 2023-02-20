const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_extinguisher_type: {
        type: String,
        required: true,
        trim: true,
    },
    product_extinguisher_capacity: {
        type: String,
        required: true,
        trim: true,

    },
    product_manufactured_date: {
        type: String,
        required: true,
    },
    product_due_date: {
        type: String,
        required: true,
    },
    product_remarks: {
        type: String,
        required: true,
        trim: true
    },
    product_client_id: {
        type: String,
        required: true,
        trim: true
    },
    product_consultant_id: {
        type: String,
        required: true,
        trim: true
    }
})


const product = new mongoose.model("products", ProductSchema)

module.exports = product;