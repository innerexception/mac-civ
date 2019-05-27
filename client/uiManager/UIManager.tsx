import * as React from 'react';
import Session from '../session/Session'
import Splash from '../session/Splash'
import Editor from '../session/Editor'
import AppStyles from '../AppStyles';

interface Props {
    currentUser: Player
    event: Event
}

export default class UIManager extends React.Component<Props> {
    getComponent = () => {
        if(!this.props.currentUser.id){
            return <Splash />
        }
        else if(this.props.currentUser.civName === 'admin'){
            return <Editor currentUser={this.props.currentUser} />
        }
        else {
            return <Session currentUser={this.props.currentUser} 
                            event={this.props.event} />
        }
    }

    render(){
        return (
            <div style={styles.frame}>
                {this.getComponent()}
            </div>
        )
    }
}

const styles = {
    frame: {
        height: '100vh',
        display:'flex', justifyContent:'center', alignItems:'center',
        backgroundImage: 'url('+require('../assets/grayTile.png')+')',
        backgroundRepeat: 'repeat'
    },
    dot: {
        height:'0.5em',
        width:'0.5em',
        borderRadius: '0.5em'
    },
    statusDot: {
        position:'absolute' as 'absolute', bottom:'0.5em', right:'0.5em',
        display:'flex',
        color:AppStyles.colors.black,
        alignItems:'center'
    }
}