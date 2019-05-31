import * as React from 'react'
import AppStyles from '../AppStyles';
import { TopBar, Button } from '../Shared'
import { onChoose } from '../uiManager/Thunks';

interface Props {
    player: Player
    event: CivEvent
}

export default class Session extends React.Component<Props> {
    render(){
        let event = this.props.event
        let player = this.props.player
        return (
            <div style={AppStyles.window}>
                {TopBar('MacCiv')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div>Culture: {player.culture}</div>
                        <div>Productivity: {player.economics}</div>
                        <div>Military: {player.military}</div>
                        <div>Technology: {player.technology}</div>
                    </div>
                    <h4 style={{margin:'0.5em'}}>{event.text}</h4>
                    {event.choices.filter(choice=>shouldDisplayChoice(player, choice))
                                  .map(choice=>
                        <div style={styles.choice} onClick={()=>onChoose(player, event, choice)}>
                            {choice.text}
                        </div>
                    )}
                </div>
         </div>
        )
    }
}

const shouldDisplayChoice = (player:Player, choice:EventChoice) => 
    player.culture >= choice.cultureCost &&
               player.economics >= choice.economicsCost &&
               player.military >= choice.militaryCost &&
               player.sociology >= choice.sociologyCost &&
               player.technology >= choice.technologyCost &&
            ((choice.ciAxisCost < 0 && player.ciAxis <= choice.ciAxisCost) || (choice.ciAxisCost > 0 && player.ciAxis >= choice.ciAxisCost) || (choice.ciAxisCost===0)) &&
            ((choice.faAxisCost < 0 && player.faAxis <= choice.faAxisCost) || (choice.faAxisCost > 0 && player.faAxis >= choice.faAxisCost) || (choice.faAxisCost===0)) &&
            ((choice.rsAxisCost < 0 && player.rsAxis <= choice.rsAxisCost) || (choice.rsAxisCost > 0 && player.rsAxis >= choice.rsAxisCost) || (choice.rsAxisCost===0))
    


const styles = {
    choice: {
        padding: '0.5em',
        marginBottom: '0.5em',
        border: '1px solid',
        borderRadius: '0.5em',
        cursor: 'pointer'
    }
}