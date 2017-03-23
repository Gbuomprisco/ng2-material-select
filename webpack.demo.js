const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack Config
const webpackConfig = {
    entry: {
        'polyfills': './demo/polyfills.ts',
        'vendor': './demo/vendor.ts',
        'app': './demo/app.ts'
    },

    output: {
        path: path.resolve('./dist')
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills'], minChunks: Infinity}),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                    resourcePath: 'modules'
                },

                postcss: () => [precss, autoprefixer]
            }
        }),
        new ExtractTextPlugin("styles.css")
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.png/,
                loader: "url-loader",
                query: {mimetype: "image/png"}
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.join(__dirname, 'node_modules', 'rxjs'),
                    path.join(__dirname, 'node_modules', '@angular')
                ]
            }
        ],
        noParse: [
            path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
            path.join(__dirname, 'node_modules', 'angular2', 'bundles')
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
