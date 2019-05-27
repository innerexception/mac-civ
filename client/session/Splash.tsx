import * as React from 'react';
import { onMatchStart } from '../uiManager/Thunks'
import AppStyles from '../AppStyles';
import { Button, TopBar } from '../Shared'
import { getId, getSaves } from '../Util';

export default class Splash extends React.Component {

    state = { name: '', saves: getSaves() }
    
    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('Welcome')}
                <div style={{padding:'0.5em'}}>
                    <h3 style={{margin:'0'}}>MacCiv</h3>
                    <input style={{...styles.loginInput, marginBottom:'0.5em'}} 
                           type="text" 
                           value={this.state.name} 
                           onChange={(e)=>this.setState({name:e.currentTarget.value})}/>
                    {Button(!!this.state.name, ()=>onMatchStart(getNewPlayer(this.state.name)), 'New')}
                    {this.state.saves.map(player => 
                        Button(true, ()=>onMatchStart(player), 'Load '+player.civName))}
                </div>
            </div>
        )
    }
}

const getNewPlayer = (name:string) => {
   return {
        id: getId(),
        civName: name,
        level: 0,
        turn: 0,
        ciAxis: 0,
        faAxis: 0,
        military: 0,
        sociology: 0,
        technology: 0,
        economics: 0,
        culture: 0
    }
}

const styles = {
    loginInput: {
        boxShadow: 'none',
        border: '1px solid',
        minWidth:'10em'
    }
}