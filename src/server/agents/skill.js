import Skill from '../models/skill';

export default class SkillAgent {

    /**
     *
     * @param page
     * @param limit
     * @param lean
     * @returns {*|Promise}
     */
    static async getSkillsPages(page = 1, limit = 10, lean = true){
        return await Skill.paginate({}, {page, limit, lean});
    }

    static async getSkillsPagesStartWith(name, page = 1, limit = 10, lean = true){
        return await Skill.paginate({name:new RegExp(`^${name}`, 'i')}, {page, limit, lean});
    }
}