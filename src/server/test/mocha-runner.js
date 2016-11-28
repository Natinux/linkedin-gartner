import path from 'path';
import Mocha from 'mocha';
import yargs from 'yargs';
import glob from 'glob';

import LogHelper from '../helpers/log';

process.env.LOG_LEVEL = "fatal";
process.env.TEST_MODE = true;

async function main() {

    LogHelper.info('Starting mocha runner');

    try{
        let argv = yargs.argv;
        let mocha = new Mocha({
            timeout: 5000,
            fullTrace: true
        });
        // run the mocha
        let pattern = argv._[0];
        let files = glob.sync(pattern);
        files.forEach(file => {
            mocha.addFile(path.resolve(file));
        });

        LogHelper.info(`found ${files.length} file(s)`);

        mocha.run(failures => {
            process.on('exit', () => {
                LogHelper.info('mocha tests failed');
                process.exit(failures);
            });
            LogHelper.info('End mocha tests :-)');
            process.exit(0);
        });
        LogHelper.info('mocha tests should start running...');
    }catch (e){
        LogHelper.error(e);
    }
}


try {
    main();
}catch (e){
    LogHelper.error(e);
}