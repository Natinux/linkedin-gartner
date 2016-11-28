import del from 'del';
import paths from '../paths';

export default ()=>{
    return ()=>{
        return del(paths.base.dest, {force:true});
    }
};