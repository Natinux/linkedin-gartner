import {ConfigHelper, LogHelper, GeneralHelper, EnvHelper} from './';

export default class CookieHelper {

    static keys    = {
        wasOpened: 'wasOpened',
        sessionId: 'sessionId'
    };

    /**
     * Get the cookie full name according to the predefined prefix.
     * According to the environment settings the key will be encoded by base64.
     * @param key The key of cookie.
     */
    static getKeyFullName(key){

        let _prefix = ConfigHelper.get('cookie.prefix');

        // Add env name to cookie name
        _prefix = EnvHelper.isProd() ? _prefix : `${EnvHelper.getEnvName()}.${_prefix}`;

        var fullKey = _prefix + key;
        return EnvHelper.isProd() && btoa ? btoa(fullKey) : fullKey;
    }

    /**
     * Sets a cookie for the name and value you passed, honoring potential filtering options.
     * Returns the actual cookie string written to the underlying `document.cookie` property.
     * @param key The key of cookie.
     * @param value The value of cookie. If it's an object it will be serialized into JSON.
     * @param options
     *      Possible options are:
     *          @param path specifies the path within the current domain. Defaults to the current path. Minimum is '/'. Ignored if blank.
     *          @param domain specifies the cookie sub-domain. Gets the default value if it's blank.
     *          @param expires specifies the date (object) when this cookie will delete at.
     *          @param maxAge specifies time to delete the cookie in seconds.
     */
    static set(key, value, options) {
        key = CookieHelper.getKeyFullName(key);
        options = options || {};
        var cookieArr = [];
        var valueStr;

        if(typeof value === 'object'){
            valueStr = JSON.stringify(value);
        }else{
            valueStr = value.toString();
        }

        cookieArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(valueStr));
        cookieArr.push('path=' + (options.path ? options.path : '/'));

        let hostName = window.location.hostname;
        var domain = options.domain ? options.domain : hostName;
        cookieArr.push('domain=' + domain);

        var maxAge = null;
        if (options.maxAge && !isNaN(options.maxAge)) {
            maxAge = options.maxAge;
        }else if (options.max_age && !isNaN(options.max_age)) {
            maxAge = options.max_age;
        }

        if(maxAge) {
            cookieArr.push('max-age=' + maxAge);
        }

        var expires = options.expires instanceof Date ? options.expires.toUTCString() : options.expires;
        if (expires) {
            cookieArr.push('expires=' + expires);
        }
        if (options.secure) def.push('secure');

        var cookie = cookieArr.join(';');
        document.cookie = cookie;

        return cookie;
    }

    /**
     * Sets a cookie for the name and value you passed, honoring potential filtering options.
     * Returns the actual cookie string written to the underlying `document.cookie` property.
     * @param key The key of cookie.
     * @param value The value of cookie. If it's an object it will be serialized into JSON.
     * @param maxAge specifies time to delete the cookie in seconds.
     * @param options
     *      Possible options are:
     *          @param path specifies the path within the current domain. Defaults to the current path. Minimum is '/'. Ignored if blank.
     *          @param domain specifies the cookie sub-domain. Gets the default value if it's blank.
     *          @param expires specifies the date (object) when this cookie will delete at.
     */
    static setMaxAge(key, value, maxAge, options){
        if(maxAge){
            options = options || {};
            options.maxAge = maxAge;
        }
        CookieHelper.set(key, value, options)
    }

    /**
     * Get the value of the cookie as a string or with predefined options.
     *
     * Returns the string value or converted to object by predefined options.
     * @param key The key of cookie.
     * @param options
     *      Possible options are one of the following:
     *          @param isBool specifies that the value should be converted to boolean.
     *          @param isNumber specifies that the value should be converted to number.
     *          @param isObject specifies that the value should be converted to object.
     */
    static get(key, options = {}){
        key = CookieHelper.getKeyFullName(key);

        var cookieValue = undefined;

        if (Object.keys(options).length > 1){
            LogHelper.warning('Several options are specific during getting the cookie.', options);
            throw new Error('Several options are specific during getting the cookie.');
        }

        var cookiesString = `; ${document.cookie}`;
        var cookieArr = cookiesString.split(`; ${encodeURIComponent(key)}=`);
        if (cookieArr.length == 2) {
            cookieValue = cookieArr.pop().split(';').shift();
        }

        if(options.isBool){
            cookieValue = cookieValue === 'true' || cookieValue === true || cookieValue == 1;
        }

        return cookieValue;
    }

    /**
     * Get the value of the cookie as a boolean.
     * @param key The key of cookie.
     */
    static getBoolean(key){
        return CookieHelper.get(key, { isBool : true})
    }

    /**
     * Get the value of the cookie as an object.
     * @param key The key of cookie.
     */
    static getObject(key){
        return CookieHelper.get(key, { isObject : true})
    }

    /**
     * Get the value of the cookie as an number.
     * @param key The key of cookie.
     */
    static getNumber(key){
        return CookieHelper.get(key, { isNumber : true})
    }

    /**
     * Removes the cookie value for the name is passed.
     * @param key The key of cookie.
     */
    static remove(key){
        var cookie = CookieHelper.get(key);
        if(cookie) {
            var options = {};
            options.expires = new Date(0);
            options.maxAge = -1;
            CookieHelper.set(key, null, options);
        }
    }

    /**
     * Gets the converted value if the options is specified or throws an error if the value is not converted.
     * @param value The value to convert.
     * @param options
     *      Possible options are one of the following:
     *          @param isBool specifies that the value should be converted to boolean.
     *          @param isNumber specifies that the value should be converted to number.
     *          @param isObject specifies that the value should be converted to object.
     */
    static parseValue(value, options = {}){
        if (Object.keys(options).length > 0) {
            if(options.isBool){
                value = GeneralHelper.convertStringToBool(value);
            }else if(options.isNumber){
                value = GeneralHelper.convertStringToNumber(value);
            }else if(options.isObject){
                value = GeneralHelper.convertStringToObject(value);
            }
        }

        return value
    }
}
