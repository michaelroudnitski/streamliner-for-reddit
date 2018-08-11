const path = require('path');

module.exports = {
  entry: './src/streamliner.js',
  target: 'node',
  output: {
    filename: 'sl.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};