const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

module.exports = [
  {
    entry: './src/index.js',
    module: {
      rules: [
        {
          loader: 'url-loader',
          test: fileRegex
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
              }
            }
          ],
          exclude: /(node_modules)/
        }
      ]
    },
    output: {
      path: path.join(__dirname, '/public'),
      filename: '[name].js',
      sourceMapFilename: '[name].js.map'
    },
    devtool: 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    }
  },

  {
    name: 'server',
    target: 'node',
    // node: { __dirname: false },
    entry: './src/server/index.ts',
    module: {
      rules: [
        {
          loader: 'null-loader',
          test: fileRegex
        },
        {
          test: /\.(css|sass|scss)$/,
          loader: 'null-loader'
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
              }
            }
          ],
          exclude: /(node_modules)/
        }
      ]
    },
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, './dist'),
      publicPath: '/static/'
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })]
    },

    devtool: 'source-map',

    performance: {
      hints: process.env.NODE_ENV !== 'production' ? false : 'warning'
    },

    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

    optimization: { nodeEnv: false }
  }
];
