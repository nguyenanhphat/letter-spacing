const path = require('path');

module.exports = (config, env) => {
  //do stuff with the webpack config...
  config.entry = {
    main: './src/index.js'
  };

  config.output = {
    path: path.resolve(__dirname, './build/'),
    filename: 'pandaWidget.js',
    library: 'MyLibrary',
    libraryTarget: 'umd'
  };

  return config;
};
