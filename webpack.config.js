const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
//const HTMLExtractWebpackPlugin = require('html-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;

// const optimization = () => {
//     const config = {
//         splitChunks:{
//             chunks: 'all'
//         }
//     };

//     if(isProdMode){
//         config.minimizer = [
//             new OptimizeCSSAssetsWebpackPlugin(),
//             new TerserWebpackPlugin()
//         ];
//     }

//     return config;
// };

const filename = ext => isDevMode ? `[name].${ext}` : `[name].[hash].${ext}`;

const PATHS = {
    // Path to main app dir
    src: path.join(__dirname, 'src'),
    // Path to Output dir
    dist: path.join(__dirname, 'dist'),
    // Path to Second Output dir (js/css/fonts etc folder)
    assets: 'assets/'
  }

const PAGES_DIR = path.join(PATHS.src, 'views');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    entry: './src/index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.css', '.less']
    },
    // optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets/'),
            to: path.resolve(__dirname, 'dist/assets'),
        }]),

        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug$/,'.html')}`,
            inject: true
          })),

        // new ExtractTextPlugin('./css/style.css'),  
        // new HTMLExtractWebpackPlugin({
        //     minify:{
        //         collapseWhitespace: isProdMode
        //     }
        // }),
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
            // {
            //     test: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: 'style-loader',
            //       use: [
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 url: false,
            //                 sourceMap: true
            //             }
            //         }, 
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         }
            //       ]
            //     })
            // },
            {
                test: /\.s[ac]ss$/,
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
                use: ['file-loader']
            },
            {
              test: /\.pug$/,
              loader: [
                {
                  loader: "html-loader"
                },
                {
                  loader: "pug-html-loader",
                  options: {
                    "pretty":true
                  }
                }
              ]
            }
        ]
    }
}