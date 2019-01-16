const entry = require('./webpack.entry.conf');
const newEntry = {};
for (let name in entry) {
  newEntry[name] = entry[name][0];
}
let config = {
  entry: newEntry,
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.pcss', '.less']
  }
};
module.exports = config;
