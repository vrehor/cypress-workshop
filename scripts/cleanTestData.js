const util = require('util');
const exec = require('child_process').exec;

module.exports.cleanTestData = () => {
  return new Promise((resolve, reject) => {
    exec(`npm run prisma:migrate:reset`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.error('Something went wrong', err);
        return reject();
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      resolve(null);
    });
  });
};
