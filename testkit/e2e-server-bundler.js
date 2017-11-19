const _ = require('lodash/fp');
const {resolve} = require('path');
const wixCommonConfig = require('yoshi/config/webpack.config.common');
const wixClientConfig = require('yoshi/config/webpack.config.client');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const fs = new MemoryFS();

const cwd = resolve(__dirname, '../src');

const getWebpackConfig = ({entry}) =>
  _.merge(wixCommonConfig, wixClientConfig({debug: false, disableModuleConatenation: false}), {
    context: cwd,
    entry: {
      bundle: entry
    },
    output: {
      path: cwd,
      filename: '[name].js'
    },
    resolve: {
      alias: {
        'wix-style-react': cwd
      }
    },
    externals: []
  });

module.exports = ({name, path}) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(getWebpackConfig({entry: path}));
    compiler.outputFileSystem = fs;

    compiler.run(err => {
      if (err) {
        return reject(err);
      }

      const content = fs.readFileSync(`${cwd}/bundle.js`, 'utf8');

      resolve(content);
    });
  });
