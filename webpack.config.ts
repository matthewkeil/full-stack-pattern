import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  target: 'node',
  devtool: 'eval-source-map',
  entry: {
    handler: resolve(__dirname, 'src', 'handler.ts')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.json']
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          }
        ]
      }
    ]
  }
};

export default config;
