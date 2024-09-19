// cucumber.js
module.exports = {
  default: {
    require: ['features/**/*.ts'],
    requireModule: ['ts-node/register'],
    //format: ['json:reports/cucumber_report.json'],
    format: ['summary'],
    parallel: 2
  }
};
