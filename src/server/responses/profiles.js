import HttpResponse from './httpResponse';

export default class ProfilePage extends HttpResponse {

    limit;
    page;
    pages;
    total;
    profiles;

    constructor({
        limit, page, pages, total, docs = []
    }){
        super();
        this.profiles = docs;
        this.limit = limit;
        this.page = page;
        this.pages = pages;
        this.total = total;
    }
}