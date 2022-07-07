import path from 'path';
import { Configuration } from 'webpack';

import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import tsLoader from './loaders/ts';

export const clientConfig: Configuration = {
    entry: './src/index.js',
    module: {
        rules: [fileLoader.client, cssLoader.client, jsLoader.client, tsLoader.client],
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
};

export default clientConfig;
