declare enum MissionType {
    Translate, TimedTranslate, Hack
}

interface Player {
    id: string
    civName: string
    level: number
    turn: number
    eventIds: Array<string>
    ciAxis: number
    faAxis: number
    rsAxis: number
    military: number
    sociology: number
    technology: number
    economics: number
    culture: number
}

interface CivEvent {
    id: string
    title: string
    nextEventId: string
    isReckoning: boolean
    level: number
    text: string
    choices: Array<EventChoice>
}

interface EventChoice {
    id: string
    eventId: string
    text: string
    ciAxisCost: number
    faAxisCost: number
    rsAxisCost: number
    militaryCost: number
    sociologyCost: number
    technologyCost: number
    economicsCost: number
    cultureCost: number
    ciAxisChange: number
    faAxisChange: number
    rsAxisChange: number
    militaryChange: number
    sociologyChange: number
    technologyChange: number
    economicsChange: number
    cultureChange: number
}

interface RState {
    player: Player
    event: CivEvent
}