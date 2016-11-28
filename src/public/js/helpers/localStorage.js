/* global window, JSON */
import moment from 'moment';
import {ConfigHelper, GeneralHelper, EnvHelper} from './';

export default class LocalStorageHelper {

    static _localStorage       = null;
    static _expirationInterval = null;
    static _expirationTime     = 60000;
    static _prefix             = null;

    static init(storage) {

        LocalStorageHelper._prefix = EnvHelper.isProd() ? ConfigHelper.get('cookie.prefix') : `${EnvHelper.getEnvName()}:${ConfigHelper.get('cookie.prefix')}`;

        LocalStorageHelper._localStorage = storage || window.localStorage;

        if (LocalStorageHelper._expirationInterval) {
            throw new Error('LocalStorageHelper must be initialized once');
        }

        LocalStorageHelper._removeOnInit();

        LocalStorageHelper._watch();
    }

    /**
     *
     * @param key
     */
    static get(key) {
        let prefixedKey = LocalStorageHelper._generateKey(key);

        let item = LocalStorageHelper._localStorage.getItem(prefixedKey);
        if (!item) {
            return null;
        }

        try {
            return JSON.parse(item).value;
        } catch (e) {
            throw new Error(`LocalStorageHelper has invalid value of [${key}]`);
        }

    }

    /**
     *
     * @param key
     */
    static remove(key) {
        return LocalStorageHelper._localStorage.removeItem( LocalStorageHelper._generateKey(key) );
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @param {object} options
     */
    static set(key, value, options = {}) {

        LocalStorageHelper._validate(...arguments);

        LocalStorageHelper._localStorage.setItem( LocalStorageHelper._generateKey(key), JSON.stringify({
            value:   value,
            options: options || {}
        }));
    }

    /**
     *
     * @param prefixedKey
     * @returns {boolean}
     */
    static _hasItem(prefixedKey) {
        return !!LocalStorageHelper._localStorage.getItem(prefixedKey);
    }

    /**
     * Gets the flag that indicates whether key is already in the storage or not.
     * @param key
     * @returns {boolean}
     */
    static containsKey(key) {
        let prefixedKey = LocalStorageHelper._generateKey(key);
        return LocalStorageHelper._hasItem(prefixedKey);
    }

    /**
     *
     * @private
     * @param {string} key
     * @param {*} value
     * @param {object} options
     */
    static _validate(key, value, options = {}) {

        if (!GeneralHelper.isString(key)) {
            throw new Error(`LocalStorageHelper key must be a string`);
        }

        if (GeneralHelper.isUndefined(value)) {
            throw new Error(`LocalStorageHelper value must be something`);
        }

        if (options.expiration && !(options.expiration instanceof Date)) {
            throw new Error(`LocalStorageHelper [${key}] expiration option must be a Date object`);
        }
    }

    /**
     *
     */
    static _watch() {
        LocalStorageHelper._expirationInterval = setInterval(() => {

            for (let prop in LocalStorageHelper._localStorage) {

                if ( prop.indexOf(LocalStorageHelper._prefix) === 0 ) {

                    let item = JSON.parse( LocalStorageHelper._localStorage.getItem(prop) );
                    if (item.options.expiration && moment().isAfter(item.options.expiration)) {
                        LocalStorageHelper._localStorage.removeItem(prop);
                    }

                }

            }

        }, LocalStorageHelper._expirationTime);
    }

    /**
     *
     * @private
     */
    static _removeOnInit() {
        for (let prop in LocalStorageHelper._localStorage) {

            if ( prop.indexOf(LocalStorageHelper._prefix) === 0 ) {

                let item = JSON.parse( LocalStorageHelper._localStorage.getItem(prop) );
                if (item.options.removeOnInit) {
                    LocalStorageHelper._localStorage.removeItem(prop);
                }

            }

        }
    }

    /**
     *
     */
    static unwatch() {
        clearInterval(LocalStorageHelper._expirationInterval);
        LocalStorageHelper._expirationInterval = null;
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    static _generateKey(key) {
        return `${LocalStorageHelper._prefix}${key}`;
    }

    static getStorage() {
        return LocalStorageHelper._localStorage;
    }
}
