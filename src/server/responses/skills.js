import HttpResponse from './httpResponse';

export default class KillsResponse extends HttpResponse {

    limit;
    page;
    pages;
    total;
    skills;

    constructor({
        limit, page, pages, total, docs = []
    }){
        super();
        this.skills = docs;
        this.limit = limit;
        this.page = page;
        this.pages = pages;
        this.total = total;
    }
}