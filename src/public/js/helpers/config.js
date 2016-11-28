import selectn from 'selectn';

export default class ConfigHelper{
    static get(path){
        return selectn(path, ConfigHelper.configData);
    }

    static init(){
        ConfigHelper.configData = {};
        Object.assign(ConfigHelper.configData, window.configData);
    }
};