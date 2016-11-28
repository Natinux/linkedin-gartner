import {LogHelper} from './index'

export default class GeneralHelper {

    /**
     * You need to provide this method array of functions that RETURN PROMISE and not array of promises
     * @param arr
     * @returns {Promise}
     */
    static runPromiseSequence(arr){
        if(!arr) return;

        return new Promise((resolve, reject) => {
            arr.reduce((curr, next)=>{
                return curr.then(next);
            }, Promise.resolve()).then(resolve).catch(reject);
        });
    }

    /**
     * Converts the string to boolean or returns null if the object is undefined.
     * @param value The value to convert.
     */
    static convertStringToBool(value){
        if(!value) return null;

        try{
            return JSON.parse(value.toLowerCase());
        }catch(err){
            LogHelper.warning('Couldn\'t convert string to boolean.', { inputValue : value });
            throw new Error('Couldn\'t convert string to boolean.');
        }
    }

    /**
     * Converts the string to number or returns null if the object is undefined.
     * @param value The value to convert.
     */
    static convertStringToNumber(value){
        if(!value) return null;

        try{
            return JSON.parse(value);
        }catch(err){
            LogHelper.warning('Couldn\'t convert string to number.', { inputValue : value });
            throw new Error('Couldn\'t convert string to number.');
        }
    }

    /**
     * Converts the string to object or returns null if the object is undefined.
     * @param value The value to convert.
     */
    static convertStringToObject(value){
        if(!value) return null;

        try{
            return JSON.parse(decodeURIComponent(value));
        }catch(err){
            LogHelper.warning('Couldn\'t convert string to number.', { inputValue : value });
            throw new Error('Couldn\'t convert string to number.');
        }
    }

    /**
     * Returns a flag that indicates whether the input val is string or not.
     * @param val The value to check.
     * @returns {boolean}
     */
    static isString(val){
        return typeof val === 'string';
    }

    /**
     * Returns a flag that indicates whether the input val is number or not.
     * @param val The value to check.
     * @returns {boolean}
     */
    static isNumber(val){
        return typeof val === 'number';
    }

    /**
     * Returns a flag that indicates whether the input val is undefined or not.
     * @param val The value to check.
     * @returns {boolean}
     */
    static isUndefined(val){
        return typeof val === 'undefined';
    }

    /**
     * Returns a flag that indicates whether the input val is function or not.
     * @param val The value to check.
     * @returns {boolean}
     */
    static isFunction(val){
        return typeof val === 'function';
    }

    /**
     * Loads an image wrapped onload event in promise.
     * @param url
     * @returns {Promise}
     * @constructor
     */
    static loadImage(url) {
        return new Promise((resolve, reject)=> {
            var tmpImg = new Image();
            tmpImg.src = url;
            tmpImg.onload = () => resolve(tmpImg);
        });
    }
}