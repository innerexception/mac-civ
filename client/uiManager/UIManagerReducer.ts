import { ReducerActions } from '../../enum'
import { getId, shuffleArray } from '../Util';

const appReducer = (state = getInitialState(), action:any) => {
    switch (action.type) {
        case ReducerActions.NEXT_EVENT: 
            return { ...state, player: action.player, event: action.event }
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        player: {},
        event: null as null
    }
}