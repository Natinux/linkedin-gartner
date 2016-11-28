import os from 'os';
import fs from 'fs';
import BaseHelper from './base';
import config from '../config';

const CGROUP_FILE_PATH = '/proc/self/cgroup';

export default class EnvironmentHelper extends BaseHelper {

    static isContainer(){
        let osType = os.type();
        if(osType != 'Linux') return false;

        try{
            fs.accessSync(CGROUP_FILE_PATH, fs.constants.R_OK);
            let cgroups = fs.readFileSync(CGROUP_FILE_PATH, {encoding: 'utf8'});
            return !!EnvironmentHelper.determine(cgroups.toString('utf8'));
        }catch (e){}

        return false;
    }

    static determine(data){
        // from containerized module
        return data.match(new RegExp('[0-9]+\:[a-z_-]+\:\/docker\/' + EnvironmentHelper.getHostName() + '[0-9a-z]+', 'i')) !== null;
    }

    static getHostName(){
        return os.hostname();
    }

    static is(name){
        return config.get('env:name') === name;
    }

    static isDev(){
        return EnvironmentHelper.is('dev');
    }

    static isTest(){
        return EnvironmentHelper.is('test');
    }

    static isProd(){
        return EnvironmentHelper.is('prod');
    }

    static isTestMode(){
        return !!process.env.TEST_MODE;
    }
}