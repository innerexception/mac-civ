import * as React from 'react'
import AppStyles from '../AppStyles'
import { TopBar, Button, LightButton } from '../Shared'
import { EmptyEvent, EmptyChoice } from '../../enum'
import * as FileSaver from 'file-saver'
import { getId } from '../Util';
let initialEvent = {...EmptyEvent, id:getId()}

interface Props {
    currentUser: Player
}

interface State {
    events: Array<CivEvent>
    selectedEventId: string
}

export default class Editor extends React.Component<Props, State> {

    state = { 
        selectedEventId: initialEvent.id,
        events: [initialEvent],
    }
    
    saveFile = () => {
        var file = new File([JSON.stringify(this.state.events)], "events.json", {type: "text/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    chooseFile = async (e:FileList) => {
        const data = await new Response(e[0]).text()
        const events = JSON.parse(data)
        this.setState({events, selectedEventId: events[0].id})
    }

    addChoice = () => {
        let parent = this.state.events.find(event=>event.id===this.state.selectedEventId)
        this.state.events.forEach(event=>{
            if(event.id === parent.id){
                event.choices.push(getEmptyChoice(parent.id))
            }
        })
        this.setState({events: this.state.events})
    }

    deleteChoice = (i:number) => {
        let parent = this.state.events.find(event=>event.id===this.state.selectedEventId)
        this.state.events.forEach(event=>{
            if(event.id === parent.id){
                event.choices.splice(i,1)
            }
        })
        this.setState({events: this.state.events})
    }

    setChoiceValue = (key: string, choiceId: string, value: any) => {
        let parent = this.state.events.find(event=>event.id===this.state.selectedEventId)
        this.state.events.forEach(event=>{
            if(event.id === parent.id){
                event.choices = event.choices.map(echoice=>{
                    if(echoice.id === choiceId) return {...echoice, [key]:value}
                    return echoice
                })
            }
        })
        this.setState({events: this.state.events})
    }

    insertNewEvent = () => {
        let newEvent = {...EmptyEvent, id:getId()}
        this.state.events.push(newEvent)
        this.setState({events: this.state.events})
    }

    deleteEvent = () => {
        this.state.events = this.state.events.filter(event=>event.id !== this.state.selectedEventId)
        this.setState({events: this.state.events, selectedEventId: this.state.events[0].id})
    }

    getEventField = (key:string) => {
        return (this.state.events.find(event=>event.id === this.state.selectedEventId) as any)[key]
    }

    setEventField = (key:string, value:any) => {
        this.state.events.forEach(event=>{
            if(event.id === this.state.selectedEventId){
                (event as any)[key]=value
            }
        })
        this.setState({events: this.state.events})
    }

    render(){
        return (
            <div style={{...AppStyles.window}}>
                {TopBar('Editor')}
                <div style={{display:'flex'}}>
                    <h5>Load</h5>
                    <input type="file" onChange={ (e) => this.chooseFile(e.target.files) }/>
                    {LightButton(true, this.saveFile, 'Export')}
                </div>
                {LightButton(true, this.insertNewEvent, 'New Event')}
                <h4>Edit Event</h4>
                <select onChange={(e)=>this.setState({selectedEventId: e.currentTarget.value})}>
                    {this.state.events.map(event=><option value={event.id}>{event.title}</option>)}
                </select>
                {LightButton(true, this.deleteEvent, 'Delete Event')}
                <div style={{display:'flex'}}>
                    <h5>Title</h5>
                    <input type="text" value={this.getEventField('title')} onChange={(e)=>this.setEventField('title', e.currentTarget.value)}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Text</h5>
                    <textarea value={this.getEventField('text')} onChange={(e)=>this.setEventField('text', e.currentTarget.value)}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Level</h5>
                    <input type="number" value={this.getEventField('level')} onChange={(e)=>this.setEventField('level', +e.currentTarget.value)}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Chain Event</h5>
                    <select value={this.getEventField('nextEventId')} onChange={(e)=>this.setEventField('nextEventId', e.currentTarget.value)}>
                        {this.state.events.map(event=><option value={event.id}>{event.title}</option>)}
                    </select>
                </div>
                {LightButton(true, this.addChoice, 'Add Choice')}
                {this.state.events.find(event=>event.id === this.state.selectedEventId).choices.map((choice, i)=>
                    <div style={{height:'5em', overflow:'auto', margin:'0.5em', borderBottom:'1px solid'}}>
                        <h5>Text</h5>
                        <input type="text" value={choice.text} onChange={(e)=>this.setChoiceValue('text', choice.id, e.currentTarget.value)} />  
                        {Object.keys(choice).filter(key=>key !== 'text' && key !== 'eventId' && key !== 'id').map(key=>
                            <div>
                                <h5>{key}</h5>
                                <input type="number" value={(choice as any)[key]} onChange={(e)=>this.setChoiceValue(key, choice.id, +e.currentTarget.value)}/>
                            </div>
                        )}
                        {LightButton(true, ()=>this.deleteChoice(i), 'Delete')}
                    </div>
                )}
            </div>
        )
    }
}

const getEmptyChoice = (eventId: string) => {
    return {...EmptyChoice, eventId, id: getId()}
}

const styles = {
    
}