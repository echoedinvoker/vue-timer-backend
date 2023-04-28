const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: `${__dirname}/config.env`})
const app = require("./app")


mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
}).then(con => {
    // console.log(con.connection)
    console.log('DB connection successful!')
  })

const lectureSchema = new mongoose.Schema({
  
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode...`)
})
