import webpack from 'webpack';

module.exports = {
  entry: [
    './entry.js'
  //  'webpack/hot/dev-server/'

  ],
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
    //  loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'],
        loader: 'babel-loader',
      query: {
       presets: ['react', 'es2015', 'stage-1', 'react-hmre']
      //    presets: ['react', 'es2015'm]
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    port:3000,
    historyApiFallback: true,
    contentBase: './'
  }
};
