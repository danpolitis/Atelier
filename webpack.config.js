const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, 'client', 'src', 'index.jsx');
const DIST_DIR = path.resolve(__dirname, 'client', 'dist');

module.exports = {
  entry: SOURCE_DIR,
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
};
