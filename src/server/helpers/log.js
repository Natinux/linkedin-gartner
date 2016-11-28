import Logger from '../utils/logger';

export default class LogHelper{

    static _logger;

    static init(){
        LogHelper._logger = new Logger('LinkedIN');
    }

    static getLogger(){
        if(!LogHelper._logger) LogHelper.init();
        return LogHelper._logger.logger;
    }

    static info(msg, obj){
        if(!LogHelper._logger) LogHelper.init();
        LogHelper._logger.info(msg, obj);
    }

    static warn(msg, obj){
        if(!LogHelper._logger) LogHelper.init();
        LogHelper._logger.info(msg, obj);
    }

    static error(err, obj){
        if(!LogHelper._logger) LogHelper.init();
        LogHelper._logger.error(err, obj);
    }

    /**
     *
     * @param msg
     * @param obj
     */
    static debug(msg, obj){
        if(!LogHelper._logger) LogHelper.init();
        LogHelper._logger.debug(msg, obj);
    }

    static fatal(msg, obj){
        if(!LogHelper._logger) LogHelper.init();
        LogHelper._logger.fatal(msg, obj);
    }
}