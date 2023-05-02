const { exec } = require('child_process');

function executeScript(script) {
  return new Promise((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
      return
    });
  });
}

// Example usage
exports.start = async (req, res) => {
  try {
    await executeScript(`${__dirname}/../script/start.sh ${req.body.dir} ${req.body.url}`)

    res.status(200).json({
      status: "success",
    })
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.corner = async (_, res) => {
  try {
    await executeScript(`${__dirname}/../script/corner.sh`)

    res.status(200).json({
      status: "success",
    })
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.cornerForm = async (_, res) => {
  try {
    await executeScript(`${__dirname}/../script/cornerForm.sh`)

    res.status(200).json({
      status: "success",
    })
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message
    })
  }
}

exports.fullscreen = async (_, res) => {
  try {
    await executeScript(`${__dirname}/../script/fullscreen.sh`)

    res.status(200).json({
      status: "success",
    })
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message
    })
  }
}
