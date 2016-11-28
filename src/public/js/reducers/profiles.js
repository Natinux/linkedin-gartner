import * as types from '../constants/actionTypes';

export const Profiles = (profiles = {}, action) => {
    switch(action.type){
        case types.ADD_PROFILES:
            //todo: do not destroy previous data
            return action.profilesPage;
        default:
            return profiles;
    }
};