const path = require('path');

// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src_frontend/index.tsx'
    },
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            //{test: /\.tsx?$/, loader: 'ts-loader' }
            /*
            {
              test: [/\.jsx?$/, /\.tsx?$/],
              use: 'babel-loader',
              exclude: /node_modules/,
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  'jsx-dom-expressions',
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            }
            */
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                include: path.resolve(__dirname, 'src_frontend'),
                use: {
                    loader: 'babel-loader',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            // Currently it is not possible to import echarts from the "lib" folder
            // and set the language: https://github.com/apache/incubator-echarts/issues/7451
            // As a temporary work-around we import it from the "dist" folder instead,
            // which has pre-bundled English versions.
            echarts$: path.resolve(__dirname, 'node_modules/echarts/dist/echarts-en.min.js'),
        },
    },
    plugins: [
        // https://webpack.js.org/guides/hot-module-replacement
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //   title: 'Hot Module Replacement'
        // }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        //disableHostCheck: true,
        //hot: true,
        //inline: true,
    }
};
