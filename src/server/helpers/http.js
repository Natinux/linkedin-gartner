import BaseHelper from './base';
import {HttpValidationError} from '../errors/http/index';

export default class HttpHelper extends BaseHelper {

    static requestValidation(req){
        var errors = req.validationErrors();

        if (errors){
            return new HttpValidationError(errors);
        }
    }

    static isAjaxRequest(req){
        return req.xhr;
    }

    static getRequestIP(req){
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }

    static getClientIp(req){
        return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    }
}