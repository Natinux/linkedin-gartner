import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function(options = {}){

    const projectRoot = path.resolve(__dirname, '../../');

    let paths = {
        base: {
            src: path.resolve(projectRoot, 'src/'),
            vendor: path.resolve(projectRoot, 'node_modules'),
            dest: path.resolve(projectRoot, `dist/`)
        }
    };

    let context = path.join(paths.base.src, 'public', 'js');

    return {
        context,
        entry: {
            bundle: './bootstrap.js'
        },
        output: {
            path: path.join(paths.base.dest, 'public', 'js'),
            filename: '[name].js',
            publicPath: '/public/js/'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: ['nodent-loader', 'babel?' + JSON.stringify({
                        plugins: [
                            'add-module-exports',
                            'transform-class-properties',
                            'syntax-async-functions',
                            'fast-async',
                            'check-es2015-constants',
                            'transform-es2015-arrow-functions',
                            'transform-es2015-block-scoped-functions',
                            'transform-es2015-block-scoping',
                            'transform-es2015-classes',
                            'transform-es2015-computed-properties',
                            'transform-es2015-destructuring',
                            'transform-es2015-duplicate-keys',
                            'transform-es2015-for-of',
                            'transform-es2015-function-name',
                            'transform-es2015-literals',
                            'transform-es2015-modules-commonjs',
                            'transform-es2015-object-super',
                            'transform-es2015-parameters',
                            'transform-es2015-shorthand-properties',
                            'transform-es2015-spread',
                            'transform-es2015-sticky-regex',
                            'transform-es2015-template-literals',
                            'transform-es2015-typeof-symbol',
                            'transform-es2015-unicode-regex'
                        ],
                        presets: [
                            'stage-1',
                            'react'
                        ]
                    })]
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                },
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=font.[name].[ext]'
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=font.[name].[ext]'
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=font.[name].[ext]'
                }, {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=font.[name].[ext]'
                }
            ]
        },
        resolve: {
            modulesDirectories: ['node_modules']
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            // new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'vendors.js',
                minChunks: (module, count) => {
                    return module.resource && module.resource.indexOf('node_modules') !== -1 && count >= 1;
                }
            }),
            new ExtractTextPlugin('[name].css', {
                allChunks: true
            })
        ]
    }
}