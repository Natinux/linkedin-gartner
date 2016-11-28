import BaseService from './base';

export default class UserService extends BaseService{

    /**
     * Get user data
     * @param username
     * @returns {username, email}
     */
    async get(username){
        let requst = new Request(`${this.baseUrl}/api/user/${username}`);
        return fetch(request).then(response => response.json());
    }
}