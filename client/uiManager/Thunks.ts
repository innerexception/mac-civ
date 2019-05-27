import { dispatch } from '../../client/App'
import { ReducerActions } from '../../enum'
import { getRandomInt } from '../Util';

export const onMatchStart = (currentUser:Player) => {
    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        currentUser
    })
}

export const onChoose = (choice:EventChoice) => {

}

export const onBuildImplant = () => {
    
}