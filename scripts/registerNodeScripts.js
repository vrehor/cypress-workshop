const { cleanTestData } = require('./cleanTestData.js');
const { seedTestData } = require('./seedTestData.js');

module.exports.registerNodeScripts = on => {
  on('task', { cleanTestData, seedTestData });
};
