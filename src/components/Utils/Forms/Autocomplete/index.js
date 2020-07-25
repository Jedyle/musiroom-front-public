import React, { Component } from 'react';
import Base from './base';

export default class AutocompleteInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            cursor: 0
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        const cursor = this.state.cursor;
        const autocompleteList = this.props.autocompleteList;

        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            this.setState( prevState => ({
                cursor: prevState.cursor - 1
            }));
        } else if (e.keyCode === 40 && cursor < autocompleteList.length - 1) {
            this.setState( prevState => ({
                cursor: prevState.cursor + 1
            }));
        }
        // press enter
        else if (e.keyCode === 13){
            this.props.onChooseItem && this.props.onChooseItem(this.state.cursor);
            this.setState({
                cursor: 0 
            });
        }
        else {
            this.setState({
                cursor: 0 
            });
        }
    }
    
    render() {
        return (
            <Base
              cursor={this.state.cursor}
              onKeyDown={this.handleKeyDown}
              {...this.props}
            />
        );
    }
}
