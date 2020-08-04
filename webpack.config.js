const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'galpy.js',
    library: 'galpy',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
      plotly: 'Plotly'
  }
}
