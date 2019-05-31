import { dispatch } from '../../client/App'
import { ReducerActions } from '../../enum'
import { shuffleArray } from '../Util';
import * as Events from '../assets/events.json'

export const onMatchStart = (player:Player) => {
    dispatch({
        type: ReducerActions.NEXT_EVENT,
        player,
        event: getNextEventOfPlayer(player, false)
    })
}

export const onChoose = (player:Player, event:CivEvent, choice:EventChoice) => {
    player.ciAxis += choice.ciAxisChange
    player.culture += choice.cultureChange
    if(player.culture < 0) player.culture = 0
    player.economics += choice.economicsChange
    if(player.economics < 0) player.economics = 0
    player.eventIds.push(choice.eventId)
    player.faAxis += choice.faAxisChange
    player.rsAxis += choice.rsAxisChange
    if(event.isReckoning) player.level++
    player.military += choice.militaryChange
    if(player.military < 0) player.military = 0
    player.sociology += choice.sociologyChange
    if(player.sociology < 0) player.sociology = 0
    player.technology += choice.technologyChange
    if(player.technology < 0) player.technology = 0
    player.turn++

    let nextEvent = getNextEventOfPlayer(player, false)
    if(nextEvent)
        dispatch({
            type: ReducerActions.NEXT_EVENT,
            player: {...player},
            event: nextEvent
        })
    else 
        dispatch({
            type: ReducerActions.NEXT_EVENT,
            player: {...player},
            event: getNextEventOfPlayer(player, true)
        })
}

const getNextEventOfPlayer = (player:Player, isReckoning:boolean) => {
    let events = Events.filter(event=>event.level===player.level && 
                                event.isReckoning===isReckoning &&
                                player.eventIds.filter(id=>id===event.id).length===0)
    return shuffleArray(events)[0]
}
