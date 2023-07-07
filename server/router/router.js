const express = require("express")
const router = express.Router()
const {protect} = require("../middleware/auth")

const { createClient, editClient, listClient, deleteClient, deleteMultiClient } = require("../controller/client")
const { createProduct, editProduct, listProduct, deleteProduct, deleteMultiProduct } = require("../controller/product")
const { createInspector, editInspector, listInspector, deleteInspector, deleteMultiInspector } = require("../controller/inspector")
const { adminRegister, adminLogin, adminLogout } = require("../controller/admin");


/*For  Client  Module*/

router.route("/client/create").post(protect,createClient)
router.route("/client/edit/:id").patch(protect,editClient)
router.route("/client/list").get(protect,listClient)
router.route("/client/delete/:id").delete(protect,deleteClient)
router.route("/client/multidelete").delete(protect,deleteMultiClient)



/*for Product Module*/

router.route("/product/create").post(protect,createProduct)
router.route("/product/edit/:id").patch(protect,editProduct)
router.route("/product/list").get(protect,listProduct)
router.route("/product/delete/:id").delete(protect,deleteProduct)
router.route("/product/multidelete").delete(protect,deleteMultiProduct)



/* for inpector module */
router.route("/inspector/create").post(protect,createInspector)
router.route("/inspector/edit/:id").patch(protect,editInspector)
router.route("/inspector/list").get(protect,listInspector)
router.route("/inspector/delete/:id").delete(protect,deleteInspector)
router.route("/inspector/multidelete").delete(protect,deleteMultiInspector)

/* For Admin */

router.route("/adminregister").post(adminRegister);
router.route("/adminlogin").post(adminLogin);
router.route("/adminlogout").get(adminLogout);



module.exports = router