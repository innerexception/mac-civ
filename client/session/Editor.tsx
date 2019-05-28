import * as React from 'react'
import AppStyles from '../AppStyles'
import { TopBar, Button, LightButton } from '../Shared'
import { EmptyEvent, EmptyChoice } from '../../enum'
import * as FileSaver from 'file-saver'

interface Props {
    currentUser: Player
}

interface State {
    events: Array<CivEvent>
    selectedEvent: CivEvent
}

export default class Editor extends React.Component<Props, State> {

    state = { 
        events: new Array<CivEvent>(),
        selectedEvent: {...EmptyEvent}
    }
    
    saveFile = () => {
        var file = new File([JSON.stringify(this.state.events)], "mapExport.json", {type: "text/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    chooseFile = async (e:FileList) => {
        const data = await new Response(e[0]).text()
        this.setState({events: JSON.parse(data)})
    }

    addChoice = () => {
        this.state.selectedEvent.choices.push(getEmptyChoice(this.state.selectedEvent.id))
        this.setState({selectedEvent: {...this.state.selectedEvent}})
    }

    deleteChoice = (i:number) => {
        this.state.selectedEvent.choices.splice(i, 1)
        this.setState({selectedEvent: {...this.state.selectedEvent}})
    }

    setChoiceValue = (key: string, choice: EventChoice, value: number) => {
        (choice as any)[key] = value
        this.setState({selectedEvent: {...this.state.selectedEvent}})
    }

    insertNewEvent = () => {
        let newEvent = {...EmptyEvent}
        this.state.events.push(newEvent)
        this.setState({selectedEvent: newEvent, events: this.state.events})
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('Editor')}
                <div style={{display:'flex'}}>
                    <h5>Load</h5>
                    <input type="file" onChange={ (e) => this.chooseFile(e.target.files) }/>
                </div>
                {LightButton(true, this.saveFile, 'Save')}
                <h4>Edit Event</h4>
                <select onChange={(e)=>this.setState({selectedEvent: this.state.events.find(event=>event.id===e.currentTarget.value)})}>
                    {this.state.events.map(event=><option value={event.id}>{event.title}</option>)}
                </select>
                {LightButton(true, this.insertNewEvent, 'New')}
                <div style={{display:'flex'}}>
                    <h5>Title</h5>
                    <input type="text" onChange={(e)=>this.setState({selectedEvent: {...this.state.selectedEvent, title: e.currentTarget.value}})}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Text</h5>
                    <textarea onChange={(e)=>this.setState({selectedEvent: {...this.state.selectedEvent, text: e.currentTarget.value}})}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Level</h5>
                    <input type="number" onChange={(e)=>this.setState({selectedEvent: {...this.state.selectedEvent, level: +e.currentTarget.value}})}/>
                </div>
                <div style={{display:'flex'}}>
                    <h5>Chain Event</h5>
                    <select onChange={(e)=>this.setState({selectedEvent: {...this.state.selectedEvent, nextEventId: e.currentTarget.value}})}>
                        {this.state.events.map(event=><option value={event.id}>{event.title}</option>)}
                    </select>
                </div>
                {LightButton(true, this.addChoice, 'Add Choice')}
                {this.state.selectedEvent.choices.map((choice, i)=>
                    <div style={{height:'5em', overflow:'auto'}}>
                        <h5>Text</h5>
                        <input type="text" onChange={(e)=>{
                            choice.text = e.currentTarget.value
                            this.setState({selectedEvent: {...this.state.selectedEvent}})
                        }} />  
                        {Object.keys(choice).filter(key=>key !== 'text' && key !== 'eventId').map(key=>
                            <div>
                                <h5>{key}</h5>
                                <input type="number" onChange={(e)=>this.setChoiceValue(key, choice, +e.currentTarget.value)}/>
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
    return {...EmptyChoice, eventId}
}

const styles = {
    
}