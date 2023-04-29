const { spawn } = require('child_process');

const scriptPath = './script.sh';

const child = spawn('bash', [scriptPath]);

child.on('exit', (code) => {
  console.log(`Script exited with code ${code}`);
});

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
      query = await Lecture.aggregate([
        {
          $project: {
            _id: 1,
            lectureNum: {
              $toInt: {
                $arrayElemAt: [{ $split: ['$lecture', '.']  }, 0]
              }
            }
          }
        },
        {
          $sort: {
            lectureNum: 1
          }
        }
      ])
