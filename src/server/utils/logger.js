import bunyan from 'bunyan';
import path from 'path';
import PrettyStream from 'bunyan-prettystream';
import config from '../config';
import ValidationHelper from '../helpers/validation';
import EnvironmentHelper from '../helpers/environment';

export default class Logger{

    static nameLength = 15;
    static prefix = 'IN';
    static logsDir = path.join(config.get('projectDir'), 'logs');

    constructor(name, options = {}){

        name = `${Logger.prefix}:${name}`;

        let streams = [
            {
                type: 'rotating-file',
                path: Logger.logsDir + '/general.log',
                period: '1d',   // daily rotation
                count: 3        // keep 3 back copies
            }
        ];

        if(EnvironmentHelper.isContainer()) {
            streams.push({
                level: options.level || process.env.LOG_LEVEL || config.get('logging:level'),
                stream: process.stdout
            });
        }else{
            streams.push({
                level: options.level || process.env.LOG_LEVEL || config.get('logging:level'),
                stream: this._getStream(PrettyStream),
                type: options.type || 'raw'
            });
        }

        this.logger = bunyan.createLogger({
            name: name,
            serializers: {
                err: bunyan.stdSerializers.err,
                obj: function(inputObj) {

                    let typeOfInput = typeof inputObj;
                    if(typeOfInput === 'object'){
                        return inputObj;
                    }

                    // Convert
                    let res = {};
                    res[typeOfInput] = inputObj;
                    return res;
                }
            },
            streams: options.streams || streams
        });
    }

    _getStream(Class){
        let stream = new Class({useColor:false});
        stream.pipe(process.stdout);
        return stream;
    }

    _log(type, msg, obj){

        try{
            let serializers = {
                obj: obj,
                err: msg instanceof Error ? msg : undefined
            };

            return this.logger[type](...(serializers && serializers.obj || serializers.err ? [serializers, msg] : [msg]));
        }catch (e){
            console.log(e);
        }
    }

    info(msg, obj){
        this._log('info', msg, obj);
    }

    warn(msg, obj){
        this._log('info', msg, obj);
    }

    error(err, obj){
        this._log('error', ValidationHelper.isString(err) ? new Error(err) : err, obj);
    }

    debug(msg, obj){
        this._log('debug', msg, obj);
    }

    fatal(msg, obj){
        this._log('fatal', msg, obj);
    }
}

