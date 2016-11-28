import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import config from './config';
import LogHelper from './helpers/log';

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (err) console.log(err.stack);
    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null));

mongoose.Promise = global.Promise;
const app = express();

// This promise for tests
export default new Promise(async (resolve, reject) => {

    LogHelper.init();

    try{
        LogHelper.debug('App starting...');
        app.set('db', mongoose);

        let appInit = require('./initialize'); // loading app with all its imports
        await appInit(app);

        // Create HTTP server
        let server = http.createServer(app);
        let port = process.env.PORT || config.get('http:port') || 80;

        // Start the HTTP server
        server.listen(port, () => {
            LogHelper.info('HTTP Server started at port ' + server.address().port);
            // Send the app for the test runner
            resolve(app);
        });
    }catch(e){
        LogHelper.error(e);
        reject();
    }
});



