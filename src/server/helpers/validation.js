import BaseHelper from './base';

export default class ValidationHelper extends BaseHelper {

    static isBirthDateOrNothing(data){
        if(!data || data == '') return true;
        return ValidationHelper.isValidDate(data);
    }

    static isUniqueKey(key){
        if(!key) return false;
        return /^[\w_-]+$/.test(key) && key.length >= 32;
    }

    static notEquals(a, b){
        if(!a || !b) return false;
        return a !== b;
    }

    static isGoodPassword(password){
        if(!password) return false;
        if (password.length < 8) return false;
        let hasLatter = /[A-Z]/i.test(password);
        let hasNumbers = /\d/.test(password);

        return !(hasNumbers + hasLatter < 2);
    }

    static isValidDate(date){
        return !isNaN(Date.parse(date));
    }

    static allValidations(){

        let methods = {};

        Object.getOwnPropertyNames(ValidationHelper).forEach(function (p) {
            if(typeof ValidationHelper[p] === 'function'){
                methods[p] = ValidationHelper[p];
            }
        });

        delete methods['allValidations'];
        return methods;
    }

    static isNotEmptyArray(value) {
        return ValidationHelper.isArray(value) && !!value.length;
    }

    static isString(value){
        return typeof  value === 'string';
    }

    static isUndefined(value){
        return typeof value === 'undefined';
    }

    static isDefined(value){
        return typeof value !== 'undefined';
    }

    static isFunction(value){
        return typeof value === 'function';
    }

    static isArray(value){
        return value instanceof Array;
    }
}