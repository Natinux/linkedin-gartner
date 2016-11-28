import * as types from '../constants/actionTypes';

export const Alerts = (alerts = [], action) => {
    switch(action.type){
        case types.ADD_ALERT:
            const { alert } = action;
            return alerts.concat(alert);
        case types.REMOVE_ALERT:
            const { alertId } = action;
            return alerts.filter(a => a.id != alertId);
        default:
            return alerts;
    }
};