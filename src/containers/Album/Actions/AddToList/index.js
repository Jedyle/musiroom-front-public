import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getListUrl } from 'pages/urls';

import { getUserListItemsWithAlbum, getLists } from 'services/Profile';
import { createListItem, updateListItem, deleteListItem } from 'services/Lists';
import { getUser } from 'services/Auth/api';
import SwitchLogButton from 'containers/LoginFilters/SwitchLogButton';

class ListsWithAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            listsHavingAlbum: {},
            listsInfo: {},
        };
    }

    componentDidMount(){
        this.fetchLists();
    }
    
    fetchLists(){
        let { mbid } = this.props;
        // CAUTION : there is an issue if a user has more than 1000 items, they won't all be displayed!!! TODO : fix this
        getLists(getUser(), 1, 1000).then((response) => {
            this.setState({
                lists: response.data.results,
            });
        });
        getUserListItemsWithAlbum(mbid).then((response) => {
            let listItemsWithAlbum = response.data;
            let listsHavingAlbum = {};
            let listsInfo = {};
            listItemsWithAlbum.forEach((listItem) => {
                listsHavingAlbum[listItem.item_list.id] = true;
                listsInfo[listItem.item_list.id] = {
                    comment: listItem.comment,
                    itemId: listItem.id
                };
            });
            this.setState({
                listsHavingAlbum: listsHavingAlbum,
                listsInfo: listsInfo
            });
        });
    }

        onChangeComment = (listId, value) => {
        let { listsInfo } = this.state;
        listsInfo[listId] = listsInfo[listId] || {};
        listsInfo[listId].comment = value;
        this.setState({
            listsInfo: listsInfo
        });
    }

    onAddToList = (listId) => {
        let { mbid } = this.props;
        let { listsInfo } = this.state;
        let comment = listsInfo[listId] ? listsInfo[listId].comment: '';
        createListItem(
            {
                listId: listId,
                albumId: mbid,
                comment: comment
            }
        ).then((response) => {
            this.fetchLists();
        });
    }

    onEditItem = (listId) => {
        let { listsInfo } = this.state;
        let itemId = listsInfo[listId] ? listsInfo[listId].itemId : '';
        let comment = listsInfo[listId] ? listsInfo[listId].comment: '';     
        updateListItem(listId, itemId, {
            comment: comment
        }).then((response) => {
            this.fetchLists();
        });
    }

    onDeleteFromList = (listId) => {
        let { listsInfo } = this.state;
        let itemId = listsInfo[listId] ? listsInfo[listId].itemId : '';
        if (itemId){
            deleteListItem(listId, itemId).then((response) => {
                this.fetchLists();
            });
        }
    }


    render(){
        let { lists, listsHavingAlbum, listsInfo } = this.state;
        return lists.sort((l1, l2) => (l1.id - l2.id)).map((list) => (
            <div className="list-item pt-3 pb-3">
              <Link to={getListUrl(list.id)}
                    target="_blank"                
              >
                {list.title}
              </Link>              
              
              <span className="is-pulled-right mb-3">
              {
                  !listsHavingAlbum[list.id] ?
                      (
                          <button
                            className="button is-small is-success"
                            onClick={() => this.onAddToList(list.id)}
                          >
                            Add
                          </button>
                      ) :
                      (
                          <p className="buttons">
                            <button
                              className="button is-small is-outlined is-info"
                              onClick={() => this.onEditItem(list.id)}
                            >Edit</button>
                            <button
                              className="button is-small is-danger"
                              onClick={() => this.onDeleteFromList(list.id)}
                            >Delete</button>
                          </p>)
              }
              </span>              
              <textarea
                className="textarea"
                placeholder="Add comment"
                onChange={(e) => this.onChangeComment(list.id, e.target.value)}
                value={listsInfo[list.id] ? listsInfo[list.id].comment : ''}
                rows="2"></textarea>
            </div>
        ));
    }
     
}

const ListsModal = ({mbid, isActive, onToggleActive}) => (
    <div className={`modal ${isActive && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add to list</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {onToggleActive(false);}}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="list">
            {isActive &&
             <ListsWithAlbum
               mbid={mbid}
             />
            }                     
          </div>
        </section>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => {onToggleActive(true);}}
      ></button>
    </div>                 
);

class Base extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsActive: false,
        };
    }

    onToggleActive = (isActive) => {
        this.setState({
            modalIsActive: isActive 
        });
    }
        
    render() {
        let { mbid, children, buttonClasses } = this.props;
        let { modalIsActive } = this.state;
        return (
            <>
              <ListsModal
                mbid={mbid}
                isActive={modalIsActive}
                onToggleActive={this.onToggleActive}
              />
              <button
                className={`button has-margin-right-5 mb-1 ${buttonClasses}`}
                onClick={() => {this.setState({modalIsActive: true});}}
              >
                {children}
              </button>
            </>
        );
    }
    
}

const AddToListButton = ({children, ...props}) => (
    <SwitchLogButton
      className="button has-margin-right-5 has-margin-bottom-2 is-medium"
      {...props}
      userRendering={(props) => <Base{...props}>{children}</Base>}
      anonymousChildren={children}
    />
);

export default AddToListButton;
