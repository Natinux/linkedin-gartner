import path from 'path';
import apidoc from 'gulp-apidoc';
import paths from '../paths';

export default (gulp, plugins) => {

    return () => {

        let distPath = path.resolve(process.cwd(), paths.base.dest);
        let routersPath = path.resolve(distPath, 'server', 'routers');
        let destPath = path.resolve(process.cwd(), paths.base.dest, 'public', 'docs');

        return new Promise(resolve => apidoc({
            src: routersPath,
            dest: destPath,
            silent: true,
            includeFilters: [ ".*\\.js$" ]
        }, resolve));
    };
};