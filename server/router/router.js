const express = require("express")
const router = express.Router()

const {createClient,editClient,listClient,deleteClient,deleteMultiClient} = require("../controller/controller")

/*For New Client Registration */


router.route("/create").post(createClient)


/*For  Client Updation */


router.route("/edit/:id").patch(editClient)


/*For Registered Clients*/


router.route("/list").get(listClient)


/*For Delete One Client*/


router.route("/delete/:id").delete(deleteClient)


/*For Deletes Multiple Clients  */


router.route("/multidelete").delete(deleteMultiClient)

module.exports = router