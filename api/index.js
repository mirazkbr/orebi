
// const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const dbconnection = require('./config/dbconnect')
const route = require('./route')
require('dotenv').config()

const port = process.env.PORT;

//middleware
app.use(cors())
app.use(express.json())
app.use(route)

dbconnection() // Assuming dbconnection() sets up the MongoDB connection

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
