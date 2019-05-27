import * as React from 'react'
import AppStyles from '../AppStyles';
import { TopBar, Button } from '../Shared'
import { onChoose } from '../uiManager/Thunks';

interface Props {
    currentUser: Player
    event: Event
}

export default class Session extends React.Component<Props> {
    render(){
        let event = this.props.event
        let currentUser = this.props.currentUser
        return (
            <div style={AppStyles.window}>
                {TopBar('MacCiv')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    <div>
                        <h4>{currentUser.civName} Powers</h4>
                        <div>Culture: {currentUser.culture}</div>
                        <div>Productivity: {currentUser.economics}</div>
                        <div>Military: {currentUser.military}</div>
                        <div>Technology: {currentUser.technology}</div>
                    </div>
                    <h4>{event.text}</h4>
                    {event.choices.map(choice=>
                        <div onClick={()=>onChoose(choice)}>{choice.text}</div>
                    )}
                </div>
         </div>
        )
    }
}

const styles = {
    
}