import { getId } from "./client/Util";

export const ReducerActions = {
    MATCH_TICK: 'mt',
    PLAYER_UPDATE: 'pu',
    MATCH_START: 'ms',
    NEXT_EVENT: 'ne'
}
export const EmptyEvent = {
    title: '',
    nextEventId: '',
    isReckoning: false,
    level: 0,
    text: '',
    choices: new Array<EventChoice>()
}

export const EmptyChoice = {
    eventId: '',
    text: '',
    ciAxisCost: 0,
    faAxisCost: 0,
    rsAxisCost: 0,
    militaryCost: 0,
    sociologyCost: 0,
    technologyCost: 0,
    economicsCost: 0,
    cultureCost: 0,
    ciAxisChange: 0,
    faAxisChange: 0,
    rsAxisChange: 0,
    militaryChange: 0,
    sociologyChange: 0,
    technologyChange: 0,
    economicsChange: 0,
    cultureChange: 0,
}