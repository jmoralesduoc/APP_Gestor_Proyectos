const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),  // Polyfill para 'crypto'
      stream: require.resolve('stream-browserify'),    // Polyfill para 'stream'
      vm: require.resolve('vm-browserify'),            // Polyfill para 'vm'
      process: require.resolve('process/browser'),      // Polyfill para 'process'
      // Agrega otros polyfills aquí si es necesario
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',  // Proporciona el objeto process
      Buffer: ['buffer', 'Buffer'], // Proporciona el objeto Buffer
    }),
  ],
};
