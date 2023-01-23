const express = require('express')
const cors = require("cors")
const app = express()
const port = 5000
require("./config/conn")
app.use(express.json())
app.use(cors())
app.use("/api/client",require("./router/router"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))