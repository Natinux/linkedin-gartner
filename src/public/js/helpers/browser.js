import browser from 'bowser';

export default class BrowserHelper {

    static isChrome() {
        return browser.chrome;
    }

    static isFF() {
        return browser.firefox;
    }

    static isIE() {
        return browser.msie;
    }

    static isEdge() {
        return browser.msedge;
    }

    static version() {
        return browser.version;
    }
}
