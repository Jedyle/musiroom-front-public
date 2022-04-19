import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlbumList from 'containers/AlbumList';
import { truncate } from 'utils/strings';
import { getListItems, getListItemPositions, createListItem, updateListItem, updateListItemPosition, deleteListItem } from 'services/Lists';
import Paginator from 'components/Utils/Paginator';
import { getUser } from 'services/Auth/api';
import { getUserRatingsForRatings } from 'services/Ratings';
import { search } from 'services/Search';
import { getAlbumUrl } from 'pages/urls';
import { previewUrl } from 'utils/urls';

import Avatar from 'components/Profile/Avatar';

class SearchAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            listItems: []
        };
    }

    componentDidMount(){
        this.fetchListItems();
    }

    fetchListItems(){
        let { list } = this.props;
        // gives list of all items in the list
        getListItemPositions(list.id).then((response) => {
            this.setState({
                listItems: response.data.map((res) => (res.album))
            });
        });        
    }
    
    fetchResults(query){
        search({
            model: 'album',
            query: query,
            method: "auto"
        }).then((response) => {
            this.setState({
                results: response.data
            });
        });
    }
    

    onChange = (e) => {
        let query = e.target.value;
        this.setState({query: query});
        if (query.length >= 3){
            this.fetchResults(query);
        }
        else{
            this.setState({results: []});
        }
    }

    albumIsInList = (album) => {
        return this.state.listItems.map((album) => (album.mbid)).includes(album.mbid);
    }

    addAlbumToList = (album) => {
        let { list, onAddAlbum } = this.props;
        createListItem({
            listId: list.id,
            albumId: album.mbid
        }).then((response) => {
            this.fetchListItems();
            onAddAlbum();
        });
    }
    
    render(){

        let { query, results } = this.state;

        return (
            <div>
              <div className="field">
                <p className="control">
                  <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Search album"
                    name="query"
                    value={query}
                    onChange={this.onChange}
                  />
                </p>
              </div>
              <div>
                {results.map((album) => (                    
                    <div className="box">
                      <article className="media">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <img src={previewUrl(album.preview)} alt="Preview"/>
                          </figure>
                        </div>                        
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <Link to={getAlbumUrl(album.mbid)}
                                    target="_blank"
                              >
                                {album.name}
                              </Link>
                            </p>
                            {
                                this.albumIsInList(album) ?
                                    (
                                        <button className="button is-small is-outlined is-success" disabled>
                                          in the list
                                        </button>
                                    ) : (
                                        <button className="button is-info is-small"
                                                onClick={() => this.addAlbumToList(album)}
                                        >
                                          add
                                        </button>
                                    )
                            }      
                          </div>
                        </div>
                      </article>
                    </div>
                ))}
              </div>
            </div>
        );
        
    }
    
}

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
                <div className="modal-card">
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

class ItemComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            newComment: props.comment
        };
    }

    onChange = (e) => {this.setState({
        newComment: e.target.value
    });}

    onCancel = () => {this.setState({
        newComment: this.props.comment,
        isEditable: false
    });};

    onEdit = () => {this.setState({
        isEditable: true
    });}

    onSubmit = () => {
        this.props.onSubmit(this.state.newComment).then(() => {
            this.setState({
                isEditable: false
            });
        });
    }

    render(){
        let { comment, userCanEdit } = this.props;
        let { isEditable, newComment } = this.state;
        return !isEditable ? (
            <div>
              {userCanEdit &&
               (
                   <span className="is-pulled-right">
                     <span
                       className="icon"
                       style={{cursor: "pointer"}}
                       onClick={this.onEdit}
                     >
                       <i title="Edit" className="fa fa-lg fa-edit"></i>
                     </span>
                   </span>
               )
            }
              <p>
                {comment}
              </p>
            </div>
        ) : (
            <div className="field">
              <textarea
                className="textarea"
                value={newComment}
                onChange={this.onChange}
              />
              <div className="buttons">
                <button
                  className="button is-info"
                  onClick={this.onSubmit}
                >Edit</button>
                <button
                  className="button is-danger"
                  onClick={this.onCancel}
                >Cancel</button>
              </div>
            </div>
        );
    }
}

const ItemHeader = ({
    onChangePosition,
    onDelete
}) => (
    <div className="mt-5 mr-1">
      <div className="mt-5">
        <span className="icon" style={{cursor: 'pointer'}}
              onClick={onChangePosition}
        >
          <i className="fa fa-2x fa-arrows"></i>
        </span>
      </div>
      <div className="mt-5">
        <span className="icon" style={{cursor: 'pointer'}}
              onClick={onDelete}
        >
          <i className="fa fa-2x fa-trash"></i>
        </span>
      </div>                  
    </div>
);

class PositionModal extends Component {

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


class DeleteModal extends Component {

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


export default class ListContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 5,
            count: null,
            items: null,
            hasNextPage: false,
            authorRatings: {},
            positionModalIsActive: false,
            positionModalCurrentItem: null,

            deleteModalIsActive: false,
            deleteModalCurrentItem: null
        };
        this.fetchItems = this.fetchItems.bind(this);
    }

    fetchItems(page){
        getListItems({
            id: this.props.list.id,
            page: page,
            perPage: this.state.perPage
        }).then((response) => {
            this.setState({
                count: response.data.count,
                items: response.data.results,
                hasNextPage: response.data.next !== null,
                hasPreviousPage: response.data.previous !== null,
                page: page
            });
            this.fetchAuthorRatings(response.data.results);
        });
    }

    fetchAuthorRatings(items){
        let ratingsIds = items.map((item) => (item.album.rating.id));
        getUserRatingsForRatings(this.props.list.user.username, ratingsIds).then((response) => {
            let authorRatings = {};
            for (let item of response.data.results){
                authorRatings[item.rating] = item.score;
            }
            this.setState({
                authorRatings: authorRatings
            });
        });
    }
    
    componentDidMount(){
        this.fetchItems(1);
    }

    onSubmitItem(list, item, itemIndex, comment){
        return updateListItem(list.id, item.id, {
            comment: comment
        }).then((response) => {
            let items = this.state.items.slice();
            items[itemIndex].comment = response.data.comment;
            this.setState({
                items: items
            });
        });
    }

    formatHeaderContent(){
        let headers = {};
        let userCanEdit = getUser() === this.props.list.user.username;
        this.state.items.forEach((item, index) => {
            headers[item.album.rating.id] = (userCanEdit &&
                <ItemHeader
                  onChangePosition={() => this.onOpenPositionModal(item)}
                  onDelete={() => this.onOpenDeleteModal(item)}
                />);
        });
        return headers;
    }

    formatContent(){
        let authorRatings = this.state.authorRatings;
        let list = this.props.list;
        let formattedRatings = {};
        let userCanEdit = getUser() === this.props.list.user.username;
        this.state.items.forEach((item, index) => {
            formattedRatings[item.album.rating.id] = (
                (<div>
                   <p style={{maxHeight: "48px"}}>
                     <Avatar
                       size="is-48x48"
                       avatar={process.env.REACT_APP_API_URL + list.user.avatar}
                       alt={list.user.username}
                     />
                     <span className="tag ml-3 mt-3 is-medium is-profile-rating"
                           style={{position: "absolute"}}
                     >
                       {authorRatings[item.album.rating.id] || "-"}
                     </span>
                   </p>
                   <br/>
                   <ItemComment
                     comment={item.comment}
                     userCanEdit={userCanEdit}
                     onSubmit={(comment) => (this.onSubmitItem(list, item, index, comment))}
                   />
                 </div>
                ));            
        });
        return formattedRatings;
    }

    onOpenPositionModal = (currentItem) => {this.setState({positionModalIsActive: true, positionModalCurrentItem: currentItem});}
    onClosePositionModal = () => {this.setState({positionModalIsActive: false});}

    onSubmitPositionModal = (currentItem, newPosition) => {
        updateListItemPosition(this.props.list.id, currentItem.id, newPosition).then((response) => {
            this.fetchItems(this.state.page);
            this.onClosePositionModal();
        });
    }

    onOpenDeleteModal = (currentItem) => {this.setState({deleteModalIsActive: true, deleteModalCurrentItem: currentItem});}
    onCloseDeleteModal = () => {this.setState({deleteModalIsActive: false});}

    onSubmitDeleteModal = (currentItem) => {
        deleteListItem(this.props.list.id, currentItem.id).then((response) => {
            // if we delete the last item, maybe the last page does not exist anymore, if so we go to the previous page instead
            this.fetchItems((this.state.items.length > 1 || this.state.page <= 1) ? this.state.page : this.state.page - 1);
            this.onCloseDeleteModal();
        });
    }
    
    
    render() {
        let { list } = this.props;
        let { page, count, items, hasNextPage, hasPreviousPage, positionModalIsActive, positionModalCurrentItem, deleteModalIsActive, deleteModalCurrentItem } = this.state;


        let paginator = (
            <Paginator
              currentPage={page}
              previousPageUrl={hasPreviousPage}
              nextPageUrl={hasNextPage}
              onPreviousPage={() => this.fetchItems(page-1)}
              onNextPage={() => this.fetchItems(page+1)}
            />
        );
            
        return (
            <div>
              {count !== null && (
                  <p className="has-text-centered">List of {count} albums</p>
              )}
              { getUser() === list.user.username &&
                <AddAlbumSection
                  onAddAlbum={() => this.fetchItems(page)}
                  list={list}
                />
              }
              <br/>
              {items && items.length > 0 ?
               <>
                 <p className="has-text-centered">
                   {paginator}
                 </p>
                 <br/>
                 <AlbumList
                   ranks={items.map((item) => (item.order))}
                   displayRanks={list.ordered}
                   ratedObjects={items.map((item) => (item.album))}
                   content={this.formatContent()}
                   headerContent={this.formatHeaderContent()}
                 />
                 <p className="has-text-centered">
                   {paginator}
                 </p>
               </>
               : <p className="has-text-centered">This list is empty :(</p>
              }
              {getUser() && positionModalCurrentItem &&
               (
                   <PositionModal
                     list={list}
                     isActive={positionModalIsActive}
                     currentItem={positionModalCurrentItem}
                     onSubmit={this.onSubmitPositionModal}
                     onClose={this.onClosePositionModal}
                   />    
               )
              }
            {getUser() && deleteModalCurrentItem &&
             (
                 <DeleteModal
                   list={list}
                   isActive={deleteModalIsActive}
                   currentItem={deleteModalCurrentItem}
                   onSubmit={this.onSubmitDeleteModal}
                   onClose={this.onCloseDeleteModal}
                 />  
             )
            }
            </div>
        );
    }
}
