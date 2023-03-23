const exec = require('child_process').exec;

module.exports.seedTestData = seedFile => {
  return new Promise((resolve, reject) => {
    exec(
      `ts-node --project ../../apps/api/tsconfig.app.json --files ../../apps/api/prisma/seed.ts ${seedFile}`,
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.error('Something went wrong', err);
          return reject(err);
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        resolve(null);
      }
    );
  });
};
