const dotenv = require("dotenv")
dotenv.config({ path: `${__dirname}/config.env`})
const app = require("./app")


const port = process.env.PORT
app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode...`)
})
