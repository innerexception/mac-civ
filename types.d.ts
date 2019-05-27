declare enum MissionType {
    Translate, TimedTranslate, Hack
}

interface Player {
    id: string
    civName: string
    level: number
    turn: number
    ciAxis: number
    faAxis: number
    military: number
    sociology: number
    technology: number
    economics: number
    culture: number
}

interface Event {
    id: string
    nextEventId: string | null
    level: number
    text: string
    choices: Array<EventChoice>
}

interface EventChoice {
    eventId: string
    text: string
    ciAxisCost: number
    faAxisCost: number
    militaryCost: number
    sociologyCost: number
    technologyCost: number
    economicsCost: number
    cultureCost: number
    ciAxisChange: number
    faAxisChange: number
    militaryChange: number
    sociologyChange: number
    technologyChange: number
    economicsChange: number
    cultureChange: number
}

interface RState {
    currentUser: Player
    event: Event
}