import HttpResponse from './httpResponse';

export default class ProfilePage extends HttpResponse {

    url;
    skills;
    education;
    fullname;
    currentTitle;
    currentPosition;
    summary;
    experience;
    score;

    constructor({url, skills, education, fullname, currentTitle, currentPosition, summary, experience, score}){
        super();
        this.url = url;
        this.skills = skills;
        this.education = education;
        this.fullname = fullname;
        this.currentTitle = currentTitle;
        this.currentPosition = currentPosition;
        this.summary = summary;
        this.experience = experience;
        this.score = score;
    }
}