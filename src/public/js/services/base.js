import 'whatwg-fetch'; // for fetch support (maybe useless nowdays)

export default class BaseService{

    apiHost = 'localhost'; // todo: take from config
    protocol = 'http://';

    get baseUrl(){
        return `${this.protocol}${this.apiHost}`;
    }
}