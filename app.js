const express = require("express");
const morgan = require("morgan")
const cors = require('cors');
const paramsRouter = require("./routes/paramsRouter");
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

app.use("/api/v1/params", paramsRouter)

module.exports = app

