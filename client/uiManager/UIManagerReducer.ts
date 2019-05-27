import { ReducerActions } from '../../enum'
import { getId } from '../Util';
import * as Events from '../assets/events.json'

const appReducer = (state = getInitialState(), action:any) => {
    switch (action.type) {
        case ReducerActions.PLAYER_UPDATE: 
            return { ...state, currentUser: action.currentUser}
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        currentUser: {
            id: getId(),
        },
        event: getInitialEvent()
    }
}

const getInitialEvent = () => {
    let level0Events = Events.filter(event=>event.level===0)
}