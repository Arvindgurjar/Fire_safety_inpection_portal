const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/auth")

const { createClient, editClient, listClient, deleteClient, deleteMultiClient } = require("../controller/client")
const { createProduct, editProduct, listProduct, deleteProduct, deleteMultiProduct } = require("../controller/product")
const { createInspector, editInspector, listInspector, deleteInspector, deleteMultiInspector } = require("../controller/inspector")
const { adminRegister, adminLogin, adminLogout } = require("../controller/admin");


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



/* for inpector module */
router.route("/inspector/create").post(createInspector)
router.route("/inspector/edit/:id").patch(editInspector)
router.route("/inspector/list").get(listInspector)
router.route("/inspector/delete/:id").delete(deleteInspector)
router.route("/inspector/multidelete").delete(deleteMultiInspector)

/* For Admin */

router.route("/adminregister").post(protect,adminRegister);
router.route("/adminlogin").post(adminLogin);
router.route("/adminlogout").get(adminLogout);

module.exports = router