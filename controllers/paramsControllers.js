const fs = require("fs")


const parameters = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/parameters.json`)
)

exports.getParam = (req, res) => {
  const parameter = parameters.find(para => para.id == req.params.id)

  res.status(200).json({
    status: "success",
    data: {
      requestTime: req.requestTime,
      parameter
    }
  })
}

exports.getParams = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      requestTime: req.requestTime,
      parameters
    }
  })
}

exports.addParam = (req, res) => {
  const newId = parameters[parameters.length - 1].id + 1
  const newParam = Object.assign({ id: newId }, req.body)
  const newParams = [...parameters, newParam]

  fs.writeFile(
    `${__dirname}/dev-data/data/parameters.json`,
    JSON.stringify(newParams),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
      requestTime: req.requestTime,
          parameter: newParam
        }
      })
    }
  )
}

exports.updateParam = (req, res) => {
  const newParam = Object.assign(
    parameters.find(para => para.id === req.params.id * 1),
    req.body
  )

  const newParams = parameters.map(para => {
    if(para.id === newParam.id) return newParam
    return para
  })

  fs.writeFile(
    `${__dirname}/dev-data/data/parameters.json`,
    JSON.stringify(newParams),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          requestTime: req.requestTime,
          parameter: newParam
        }
      })
    }
  )
}

exports.checkID = (req, res, next, val) => {
  const param = parameters.find(para => para.id === val * 1)
  if(!param) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID"
    })
  }
  
  next()
}
