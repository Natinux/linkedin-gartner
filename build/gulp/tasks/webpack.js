import webpack from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack/webpack.config.babel';

export default (gulp, plugins, options)=>{
    return (cb) => {

        let config = webpackConfig(options);

        if (options.w){
            config.devtool = "eval";
            config.debug = true;
            config.watch = true;

            // Start a webpack-dev-server
            // return new WebpackDevServer(webpack(config), {
            //     // publicPath: "/dist/public",
            //     publicPath: "/src/public",
            //     stats: {
            //         colors: true
            //     }
            // }).listen(8080, "localhost", function(err) {
            //     if(err) return cb(err);
            //     plugins.util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
            // });
            // return new WebpackDevServer(webpack(config));
        }

        return gulp.src('src/public/js/bootstrap.js')
            .pipe(webpack(config))
            .pipe(gulp.dest('dist/public/js'));

        // webpack(config).run((err, stats) => {
        //     if(err) return cb(err);
        //     plugins.util.log('[webpack:build]', stats.toString({
        //         colors: true,
        //         chunks: false,
        //         version: false,
        //         assets: false,
        //         timings: false,
        //         entrypoints: false,
        //         chunkModules: false,
        //         chunkOrigins: false,
        //         cached: false,
        //         cachedAssets: false,
        //         reasons: false,
        //         usedExports: false,
        //         children: false,
        //         source: false,
        //         modules: false
        //     }));
        //
        //     cb();
        //
        // });
    }
}