const path = require('path')

var config = {
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
};

module.exports = (env,argv) => {
    if (argv.mode === 'development') {
	config.devtool = 'inline-source-map';
	config.module= {
	    rules: [
		{
		    // when bundling application's own source code
		    // transpile using Babel which uses .babelrc file
		    // and instruments code using babel-plugin-istanbul
		    test: /\.js/,
		    exclude: /(node_modules)/,
		    use: [
			{
			    loader: 'babel-loader'
			}
		    ]
		}
	    ]
	};
    }
    return config;
}
