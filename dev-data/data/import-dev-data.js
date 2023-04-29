const dotenv = require("dotenv")
dotenv.config({ path: `${__dirname}/../../config.env` })
const fs = require("fs")
const mongoose = require("mongoose")
const Lecture = require("../../models/lectureModel")



mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection successful!')
})

const lectures = JSON.parse(fs.readFileSync(`${__dirname}/htmlcss.json`, 'utf8'))
console.log(lectures.length)

const importMany = async () => {
  try {
    await Lecture.insertMany(lectures)
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await Lecture.deleteMany()
    console.log('Data successfully deleted!')
  } catch (error) {
    console.log(error)
  }
  process.exit()
}

if(process.argv[2] === '--import') {
  importMany()
} else if(process.argv[2] === '--delete') {
  deleteData()
}
