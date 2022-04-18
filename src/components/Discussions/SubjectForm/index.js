import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { truncate } from 'utils/strings';

import Base from "./base";
import { DISCUSSION_TYPES, createDiscussion, getObjectForDiscussionType, getDiscussionObjectName } from 'services/Discussions';
import { listAlbums } from 'services/Albums';
import { listArtists } from 'services/Artists';
import { getDiscussionUrl } from 'pages/urls';

class _SubjectForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentType: '',
            currentValue: '',
            currentTitle: '',
            currentText: '',
            selectedItem: null,
            // list of object with keys (name, object_id)
            autocompleteList: [],

            nonFieldErrors: null,
            textErrors: null,
            titleErrors: null
        };
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChooseItem = this.onChooseItem.bind(this);
        this.onResetItem = this.onResetItem.bind(this);
        this.onCreateDiscussion = this.onCreateDiscussion.bind(this);
    }

    componentDidMount(){
        if (this.props.objectId && this.props.contentType){
            getObjectForDiscussionType(this.props.contentType, this.props.objectId).then(
                (response) => {
                    this.setState({
                        selectedItem: {
                            objectId: this.props.objectId,
                            contentType: this.props.contentType,
                            name: getDiscussionObjectName({
                                content_type: this.props.contentType,
                                content_object: response.data.object
                            })
                        } 
                    });
                }  
            );
        }
    }

    onChangeType(event){
        this.setState({
            currentType: event.target.value,
            currentValue: ''
        });
    }

    onChangeValue(event){
        this.setState({
            currentValue: event.target.value 
        });
        if (event.target.value.length > 2){
            this.fetchAutocompleteValues(event.target.value);
        }
        else {
            this.setState({
                autocompleteList: [] 
            });
        }
    }

    onChangeTitle(event){
        this.setState({
            currentTitle: event.target.value 
        });
    }

    onChangeText(event){
        this.setState({
            currentText: event.target.value 
        });
    }

    fetchAutocompleteValues(search){
        switch(this.state.currentType){
        case DISCUSSION_TYPES['album']:
            listAlbums(search).then((response) => {
                this.setState({
                    autocompleteList: response.data.results.map((album) => (
                        {
                            name: `${album.title} (${album.artists[0].name})`,
                            objectId: album.id,
                            contentType: 'album'
                        }
                    )) 
                });
            });
            break;
        case DISCUSSION_TYPES['artist']:
            listArtists(search).then((response) => {
                this.setState({
                    autocompleteList: response.data.results.map((artist) => (
                        {
                            name: artist.name,
                            objectId: artist.id,
                            contentType: 'artist'
                        }
                    ))
                });
            });
            break;
        default:
            break;
        }
    }

    onChooseItem(index){
        this.setState((prevState) => ({
            autocompleteList: [],
            currentValue: '',
            selectedItem: prevState.autocompleteList[index],
        }));
    }

    onResetItem(){
        this.setState({
            selectedItem: null 
        });
    }
    
    onCreateDiscussion(){
        let ct = this.state.selectedItem ? this.state.selectedItem.contentType : null;
        let objectId = this.state.selectedItem ? this.state.selectedItem.objectId : 0; 
        
        createDiscussion(this.state.currentTitle, this.state.currentText, ct, objectId).then(
            (response) => {
                alert("Your discussion has been created !");
                this.props.history.push(getDiscussionUrl(response.data.id));
            }
        ).catch((error) => {
            if (error.response.status === 400){
                this.setState({
                    nonFieldErrors: error.response.data.non_field_errors,
                    titleErrors: error.response.data.title,
                    textErrors: error.response.data.content
                });
            }
        });       
    }
    
    render() {        
        return (
            <Base
              currentType={this.state.currentType}
              onChangeType={this.onChangeType}
              currentValue={this.state.currentValue}
              onChangeValue={this.onChangeValue}
              currentTitle={this.state.currentTitle}
              onChangeTitle={this.onChangeTitle}
              currentText={this.state.currentText}
              onChangeText={this.onChangeText}
              autocompleteList={this.state.autocompleteList.map((el) => (truncate(el.name, 80)))}
              onChooseItem={this.onChooseItem}
              onBlur={() => {this.setState({autocompleteList: []});}}
              selectedItem={this.state.selectedItem}
              onResetItem={this.onResetItem}
              onCreateDiscussion={this.onCreateDiscussion}            
              nonFieldErrors={this.state.nonFieldErrors}
              titleErrors={this.state.titleErrors}
              textErrors={this.state.textErrors}
              {...this.props}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.auth.user
    }  
);

const SubjectForm = connect(
    mapStateToProps
)(_SubjectForm);

export default withRouter(SubjectForm);
