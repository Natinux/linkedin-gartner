import mkdirp from 'mkdirp';

export default (gulp, plugins)=>{
    return ()=>{
        mkdirp('./logs');
    }
}
