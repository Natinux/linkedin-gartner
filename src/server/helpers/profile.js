
export default class ProfileHelper{

    static calculateScore(profile){
        let score = 0;
        score += profile.education.length * 5;
        score += profile.experience.length * 10;
        score += profile.skills.length;
        return score;
    }
}