const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

// Configuration factory to build for different targets
const createConfig = (target, entry, filename, format) => ({
  entry,
  target,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename,
    library: {
      type: format,
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.npm_package_version': JSON.stringify(packageJson.version),
    }),
  ],
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map' // Separate source map file in production
      : 'eval-source-map', // Faster source maps in development
  experiments: {
    outputModule: format === 'module',
  },
});

// Export array of configurations for both ESM and CommonJS
module.exports = [
  // ESM build
  createConfig('node', './src/index.ts', 'index.js', 'commonjs2'),
];
