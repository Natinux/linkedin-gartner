import {GeneralHelper, EnvHelper, LogHelper, LocalStorageHelper, ConfigHelper} from './helpers';

function loadApplication(){
    console.log("Loading application");

    ConfigHelper.init();
    LogHelper.init();
    LocalStorageHelper.init();
}

try{
    loadApplication();
    let main = require('./main');
    main.startApplication();
    LogHelper.info('Application load complete');
}catch (e){
    console.error(e);
}