const express = require("express");
const morgan = require("morgan")
const cors = require('cors');
const lectureRouter = require("./routes/lectureRouter");
const bashRouter = require("./routes/bashRouter");
const app = express()

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use("/api/v1/lecture", lectureRouter)
app.use("/api/v1/bash", bashRouter)

module.exports = app

