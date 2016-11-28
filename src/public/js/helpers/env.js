import { ConfigHelper } from './index';

export default class EnvHelper {

    /**
     * Gets environment name.
     * @returns {string}
     */
    static getEnvName(){
        return ConfigHelper.get('env.name');
    }

    static isDebugMode(){
        return false; // todo implement
    }

    static is(env){
        return EnvHelper.getEnvName() === env;
    }

    static isDev(){
        return EnvHelper.is('dev');
    }

    static isTest(){
        return EnvHelper.is('test');
    }

    static isProd(){
        return EnvHelper.is('prod');
    }

    static getLogLevel(){
        return EnvHelper.isDebugMode() ? 'debug' : ConfigHelper.get('env.log.level');
    }
}