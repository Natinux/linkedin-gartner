import path from 'path';

let paths = {
    base: {
        src: './src',
        dest: './dist'
    },
    babel: {
        get src(){
            return path.join(paths.base.src, '**/*.js');
        },
        get dest(){
            return paths.base.dest;
        }
    },
    gulp: {
        base: './build/gulp',
        tasks: './build/gulp/tasks'
    }
};

export default paths;
