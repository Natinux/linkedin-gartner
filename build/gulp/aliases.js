import runSequence from 'run-sequence';

export default (gulp, plugins, options) => {
    runSequence.use(gulp);

    gulp
        .task('build', function(callback){
            runSequence('clean-dist', 'create-folders', 'babel', 'config', 'api-docs', 'webpack', callback);
        })
        .task('dev', ['build'], cb => {
            runSequence('babel-watch', cb);
        })
        .task('dockerBuildImage', function(callback){
            runSequence('clean-dist', 'create-folders', 'babel', 'api-docs', 'webpack', callback);
        })
        .task('dockerBuildContainer', function(callback){
            runSequence('config', callback);
        })
        .task('default', ['build']);
}