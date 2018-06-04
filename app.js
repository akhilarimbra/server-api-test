const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/auth')

const app = express()
const router = require('./routes')

// app setup
app.use(morgan('combined'))
app.use(bodyParser.json({
  type: '*/*'
}))
router(app)

// server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log(`Server listening on : ${port}`)
