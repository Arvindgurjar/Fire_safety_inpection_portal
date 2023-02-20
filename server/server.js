const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" })
const express = require('express')
const cors = require("cors")
const app = express()
const port = process.env.PORT
mongoose.set('strictQuery', false)
require("./config/conn")

app.use(express.json())
app.use(cors())
app.use("/api", require("./router/router"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))