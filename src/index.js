// imports
const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const router = require('./routes/index')


// middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors())


// database connection import
require("../src/db/conn")

// consts
const PORT = process.env.PORT || 3001

// routes


app.get('/', (req, res) => {
    res.status(200).json({status: 200, message: "server is started"})
})

app.use('/api/v1', router)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})