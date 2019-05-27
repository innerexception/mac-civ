import * as React from 'react'
import AppStyles from '../AppStyles'
import { TopBar, Button } from '../Shared'
import * as FileSaver from 'file-saver'

interface Props {
    currentUser: Player
}

export default class Editor extends React.Component<Props> {

    state = { events: new Array<Event>()}
    
    saveFile = () => {
        var file = new File([JSON.stringify(this.state.events)], "mapExport.json", {type: "text/json;charset=utf-8"});
        FileSaver.saveAs(file);
    }

    chooseFile = async (e:FileList) => {
        const data = await new Response(e[0]).text()
        this.setState({map: JSON.parse(data)})
    }

    render(){
        return (
            <div style={AppStyles.window}>
                
            </div>
        )
    }
}

const styles = {
    
}