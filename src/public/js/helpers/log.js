import EnvHelper from './env';

export default class LogHelper{

    static DEFAULT_LEVEL;
    static logger = null;
    static disabled = false;

    static init(){
        LogHelper.DEFAULT_LEVEL = EnvHelper.getLogLevel();
        LogHelper.logger = console;
    }

    /**
     *
     */
    static disable() {
        LogHelper.disabled = true;
    }

    /**
     *
     */
    static enable() {
        LogHelper.disabled = false;
    }

    /**
     *
     * @param msg
     * @param obj
     */
    static info(msg, obj = ''){
        if (!LogHelper.disabled) {
            LogHelper.logger.info(msg, obj);
        }
    }

    /**
     *
     * @param msg
     * @param obj
     */
    static warning(msg, obj){
        if (!LogHelper.disabled) {
            LogHelper.logger.warn(msg, obj);
        }
    }

    /**
     *
     * @param err
     * @param obj
     */
    static error(err, obj){
        if (!LogHelper.disabled) {
            LogHelper.logger.error(err, obj);
        }
    }

    /**
     *
     * @param msg
     * @param obj
     */
    static debug(msg, obj){
        if (!LogHelper.disabled) {
            LogHelper.logger.debug(msg, obj);
        }
    }
}
