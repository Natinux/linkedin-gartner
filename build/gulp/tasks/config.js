import gutil from 'gulp-util';

export default (gulp, plugins, options) => {
    return () => {

        let env = options.env || 'prod';

        gutil.log(`building config for: ${env}`);
        return gulp.src(['./assets/config/base.json', './assets/config/' + env +'.json'])
            .pipe(plugins.extend('./config.json', true, '\t'))
            .pipe(gulp.dest('./'));

    };
};