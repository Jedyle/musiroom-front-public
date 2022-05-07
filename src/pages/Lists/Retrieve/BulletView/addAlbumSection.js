import React, { Component } from 'react';
import SearchAlbum from './searchAlbum';

import './style.css';

class AddAlbumSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    onSetActive = () => {
        this.setState({
            isActive: true
        });
    }

    onSetInactive = () => {
        this.setState({
            isActive: false
        });
    }

    render(){
        let { list, onAddAlbum } = this.props;
        let { isActive } = this.state;
        return (
            <>
              <div>
                <button className="button is-info"
                        onClick={this.onSetActive}
                >Add album</button>
              </div>
              <div className={`modal ${isActive && 'is-active'}`}>
                <div className="modal-background"></div>
                <div className="modal-card modal-card-fullwidth">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Add an album</p>
                    <button
                      className="delete"
                      aria-label="close"
                      onClick={this.onSetInactive}
                    ></button>
                  </header>
                  <section className="modal-card-body">
                    {
                        isActive &&
                            <SearchAlbum
                              onAddAlbum={onAddAlbum}
                              list={list}
                            />
                    }
                  </section>
                </div>
              </div>
            </>
        );
    }    
}


export default AddAlbumSection;
