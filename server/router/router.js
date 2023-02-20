const express = require("express")
const router = express.Router()

const { createClient, editClient, listClient, deleteClient, deleteMultiClient } = require("../controller/client")
const { createProduct, editProduct, listProduct, deleteProduct, deleteMultiProduct } = require("../controller/product")



/*For  Client  Module*/

router.route("/client/create").post(createClient)
router.route("/client/edit/:id").patch(editClient)
router.route("/client/list").get(listClient)
router.route("/client/delete/:id").delete(deleteClient)
router.route("/client/multidelete").delete(deleteMultiClient)



/*for Product Module*/

router.route("/product/create").post(createProduct)
router.route("/product/edit/:id").patch(editProduct)
router.route("/product/list").get(listProduct)
router.route("/product/delete/:id").delete(deleteProduct)
router.route("/product/multidelete").delete(deleteMultiProduct)




module.exports = router