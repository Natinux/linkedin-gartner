import * as types from '../constants/actionTypes';

// sync actions
export const addAlert = alert => ({type: types.ADD_ALERT, alert});
export const removeAlert = alertId => ({type: types.REMOVE_ALERT, alertId});
export const setDataLinkedin = (userData) => ({type: types.SET_USER_DATA_LINKEDIN, userData});
export const addProfiles = profilesPage => ({type: types.ADD_PROFILES, profilesPage});
export const addSkills = skillsPage => ({type: types.ADD_SKILLS, skillsPage});


const checkResponse = (response, dispatch) => {

    let {status, reasons} = response;
    if (status != 200) {
        dispatch(addAlert({id: +new Date, ...reasons[0]}));
        return Promise.reject(response);
    }
    return Promise.resolve(response);
};


export function addProfile(url){
    return dispatch => {
        let req = new Request('/api/people/add', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({profileURL: url})
        });

        return fetch(req)
            .then(req => req.json())
            .then(({status, reasons = []}) => {
                if(status != 200){
                    dispatch(addAlert({id:+new Date, ...reasons[0]}));
                    throw new Error('unable to add profile. please validate your link');
                }
            });
    };
}

export function searchBySkills(skills = [], pageNumber = 1, limit = 10){
    return dispatch => {
        if(skills.length < 1) {
            return dispatch(addAlert({id: +new Date, message:'Select skills to search by.'}));
        }

        let req = new Request(`/api/people/search/skills?page=${pageNumber}&limit=${limit}`, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({skills})
        });

        return fetch(req).then(req => req.json())
            .then(res => checkResponse(res, dispatch))
            .then(profilesPage => dispatch(addProfiles(profilesPage)));
    };
}

export function searchByFields(fields = {}, pageNumber = 1, limit = 10){
    return dispatch => {
        if(Object.keys(fields).length < 1) {
            return dispatch(addAlert({id: +new Date, message:'Select fields to search by'}));
        }

        let req = new Request(`/api/people/search?page=${pageNumber}&limit=${limit}`, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(fields)
        });

        return fetch(req).then(req => req.json())
            .then(res => checkResponse(res, dispatch))
            .then(profilesPage => dispatch(addProfiles(profilesPage)));
    };
}

export const loadProfile = profileId => {
    let req = new Request(`/api/people/profile/${profileId}`);
    return fetch(req).then(req => req.json());
};


export function loadProfiles(pageNumber = 1, limit = 10){
    return dispatch => {
        let req = new Request(`/api/people?page=${pageNumber}&limit=${limit}`);
        return fetch(req).then(req => req.json())
            .then(res => checkResponse(res, dispatch))
            .then(profilesPage => dispatch(addProfiles(profilesPage)));
    };
}

export function loadSkills(pageNumber = 1, limit = 10){
    return dispatch => {
        let req = new Request(`/api/skill?page=${pageNumber}&limit=${limit}`);
        return fetchSkills(req, dispatch);
    };
}

export function loadSkillsByName(name, pageNumber = 1, limit = 10){
    return dispatch => {
        let req = new Request(`/api/skill/${name}?page=${pageNumber}&limit=${limit}`);
        return fetchSkills(req, dispatch);
    };
}

function fetchSkills(request, dispatch){
    return fetch(request).then(req => req.json())
        .then(res => checkResponse(res, dispatch))
        .then(skillsPage => dispatch(addSkills(skillsPage)));
}

export function authIN() {
    return function (dispatch: Function) {
        IN.connect().then((session) => {
            dispatch(authLinkedin(session));
            dispatch(getUserData(session));
        });
    };
}

export function getUserData(session){
    return function (dispatch) {

        let req = new Request('/api/people', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({access_token: session.access_token || config.get('access_token')})
        });

        return fetch(req)
            .then(res => res.json())
            .then(data => {
                dispatch(setDataLinkedin(data));
            });
    }
}