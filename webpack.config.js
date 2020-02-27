const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;
console.log('process.env: ', process.env);
function getFileName(ext){
    return isProdMode ? `[name].${ext}` : `[name].[hash].${ext}`;
}

const PATHS = {
    src: path.join(__dirname, 'Client/src'),
    srcViews: path.join(__dirname, 'Client/src/views'),
    srcAssets: path.join(__dirname, 'Client/srcpath.join(/assets'),

    dist: path.join(__dirname, 'Client/dist'),
    distAssets: path.join(__dirname, 'Client/dist/assets'),
}

module.exports = {
    entry: path.join(PATHS.src, 'index.js'),
    output: {
        filename: getFileName('js'),
        path: PATHS.dist
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.pug']
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([{
            from: PATHS.srcAssets,
            to: PATHS.distAssets,
        }]),

        new MiniCSSExtractPlugin({
            filename: getFileName('css'),
        }),
        new HtmlWebpackPlugin({
            template: './Client/src/views/index.pug'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            hmr: isDevMode,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/, //sass|scss
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            hmr: isDevMode,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: 'file-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
        ]
    }
}