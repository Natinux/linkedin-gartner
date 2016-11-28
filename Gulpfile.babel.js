import 'babel-register';
import gulp from 'gulp';
import pluginsFn from 'gulp-load-plugins';
import fs from 'graceful-fs';
import path from 'path';
import yargs from 'yargs';

import paths from './build/gulp/paths.js';
import aliases from './build/gulp/aliases.js';

const plugins = pluginsFn();
const options = yargs
    .alias('t', 'versionType')
    .alias('v', 'env')
    .argv;

try{

    aliases(gulp, plugins, options);

    // Load all tasks
    fs
        .readdirSync(paths.gulp.tasks)
        .forEach(function(filename) {
            var file = path.join(paths.gulp.tasks, filename);
            var stat = fs.statSync(file);

            if (stat.isFile() && filename.slice(-3) !== '.js') {
                return;
            }

            var name = filename.slice(0, -3);
            var task = require(paths.gulp.tasks +'/'+ filename)(gulp, plugins, options);

            // Register the task
            gulp.task(name, task);
        });
}catch(e){
    console.log(e);
}
