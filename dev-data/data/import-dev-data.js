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


const reload = async () => {
  try {
    // Delete all lectures in the collection
    // await Lecture.deleteMany()

    // Get json file names
    const files = fs.readdirSync('./')
    const jsonFiles = files.filter(r => r.split('.').at(-1) === 'json')

    // Import all lectures into the collection
    for (f of jsonFiles) {
      const lectures = JSON.parse(fs.readFileSync(`${__dirname}/${f}`, 'utf8'))
      const formatLectures = lectures.map(l => {
        // const status = parseInt(l.lecturePath.split('-')[0]) < 82 ? 'done' : 'new'
        if (!l.length) {
          return {
            ...l,
            length: 0
          }
        }
        return l
      })
      const result = await Lecture.insertMany(formatLectures)
    }
  } catch (error) {
    console.log(error.message)
    error.message
  }

  process.exit()
}

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

if (process.argv[2] === '--import') {
  importMany()
} else if (process.argv[2] === '--delete') {
  deleteData()
} else if (process.argv[2] === '--turn-first-targeted') {
  patchFirstBeTargeted()
} else {
  reload()
}
