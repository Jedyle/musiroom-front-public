import React, { Component } from 'react';
import { getListItemPositions } from 'services/Lists';
import { truncate } from 'utils/strings';

import './style.css';

export class PositionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            positions: [],
            newPosition: null
        };
    }

    componentDidMount(){
        this.loadPositions();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isActive === false && this.props.isActive === true){
            this.loadPositions();
        }
    }
    
    loadPositions(){
        getListItemPositions(this.props.list.id).then((response) => {
            this.setState({
                positions: response.data
            });
        });
    }

    positionsWithoutCurrentItem(){
        let positions = this.state.positions.slice();
        return positions.filter((val) => (val.id !== this.props.currentItem.id));
    }

    render(){
        let { isActive, currentItem, onSubmit, onClose } = this.props;
        let { newPosition } = this.state;
        let positionsFiltered = this.positionsWithoutCurrentItem();
        return (
            <div className={`modal ${isActive && 'is-active'}`}>
              <div className="modal-background" onClick={onClose}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Move item {truncate(currentItem.album.title, 20)}</p>
                  <button className="delete" aria-label="close"
                          onClick={onClose}
                  ></button>
                </header>
                <section className="modal-card-body">
                  <div className="select">
                    <select value={newPosition} onChange={(e) => {this.setState({newPosition: e.target.value});}}>
                      <option>Select a rank</option>
                      {positionsFiltered.map((position) => (
                          <option value={position.order}>{position.order} - {position.album.title}</option> 
                      ))}
                    </select>
                  </div>
                  
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-info"
                          onClick={() => {onSubmit(currentItem, newPosition);}}
                  >Move</button>
                </footer>
              </div>
            </div>
        );
    }    
}


export class DeleteModal extends Component {

    render(){
        let { isActive, currentItem, onSubmit, onClose } = this.props;
        return (
            <div className={`modal ${isActive && 'is-active'}`}>
              <div className="modal-background" onClick={onClose}></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Delete {truncate(currentItem.album.title, 20)} ?</p>
                  <button className="delete" aria-label="close"
                          onClick={onClose}
                  ></button>
                </header>
                <section className="modal-card-body">
                  <div>
                    Delete {truncate(currentItem.album.title, 20)} from the list ?
                  </div>             
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-danger is-fullwidth"
                          onClick={() => {onSubmit(currentItem);}}
                  >Delete</button>
                </footer>
              </div>
            </div>
        );
    }        
}
