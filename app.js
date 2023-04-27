const express = require("express");
const cors = require('cors');
const fetch = require('node-fetch')

const uuid = '45ac8080-4e05-48ea-9567-2c70cc482fab'

const app = express()


app.use(cors())


app.get("/", async (req, res) => {
  
  const response = await fetch(`http://localhost:3000/api?uuid=${uuid}`)
  console.log(response)

  res.status(200).send('test')
})

const port = 4000
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
