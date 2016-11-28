import * as types from '../constants/actionTypes';

export const Skills = (skills = {}, action) => {
    switch(action.type){
        case types.ADD_SKILLS:
            //todo: do not destroy previous data
            return action.skillsPage;
        default:
            return skills;
    }
};