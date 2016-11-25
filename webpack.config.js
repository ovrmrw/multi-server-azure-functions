const fs = require('fs-extra');
const DEST = '.dest-webpack';
fs.emptyDirSync(DEST);


const webpack = require('webpack');


const loaders = [
    {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
    },
    {
        test: /\.json$/,
        loader: "json-loader",
        exclude: /\.\/secret(-|)key/i,
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['latest'],
            plugins: []
        },
        // exclude: /(node_modules|bower_components)/,
    }
];


module.exports = [
    {
        name: 'server bundle',
        target: 'node',
        entry: {
            'hapi1': './hapi1/main.ts',
            'express1': './express1/main.ts',
            'lodash': './lodash/main.ts',
        },
        output: {
            filename: DEST + '/[name]/main.js',
            libraryTarget: "commonjs2"
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        externals: [
            {
                '../../secret-key/app.secret.json': '../secret-key/app.secret.json',
                '../../secret-key/serviceAccountKey.json': '../secret-key/serviceAccountKey.json',
                'firebase': 'firebase',
                'firebase-admin': 'firebase-admin',
            }
        ],
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        // plugins: [
        //   new webpack.optimize.UglifyJsPlugin({
        //     mangle: true,
        //     compress: {
        //       warnings: false
        //     }
        //   }),
        // ],
        module: {
            loaders: loaders
        }
        // devtool: 'source-map',
    }
];