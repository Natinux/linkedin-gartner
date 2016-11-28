import path from 'path';
import paths from '../paths';
import packageJson from '../../../package.json';

export default (gulp, plugins)=>{
    return ()=>{
        return gulp
            .src([
                path.join(paths.base.src, '**/*.js'),
                '!'+path.join(paths.base.src, 'public/**/*') // exclude all in public folder
            ])

            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.babel(packageJson.babel)) // todo make sure this working
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.base.dest));
    }
};