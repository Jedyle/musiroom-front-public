import React, { Component } from 'react';
import { getList, voteOnList } from 'services/Lists';
import { ProfileLink } from 'components/Utils/Links';
import LikeDislikePanel from 'components/Utils/LikeDislikePanel';
import UserSummaryPanel from 'components/Utils/UserSummaryPanel';
import ListContent from './content';
import { updateList } from 'services/Lists';
import ListDescription from './description';
import Avatar from 'components/Profile/Avatar';

export default class RetrieveList extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: null,
            newDescription: '',
            isEditable: false
        };
    }

    componentDidMount(){
        getList(this.props.match.params.listId).then((response) => {
            this.setState({
                list: response.data,
            });
        });
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.list !== prevState.list){
            this.setState({
                newDescription: this.state.list.description
            });
        }
    }

    onToggleVote(vote){
        let newVote;
        if (this.state.list.user_vote === vote){
            newVote = "null";
        }
        else {
            newVote = vote;
        }
        voteOnList(this.state.list.id, newVote).then((response) => {
            this.setState({
                list: response.data
            });
        });
    }

    onEdit = () => {
        this.setState({
            isEditable: true
        });
    }
    
    onChange = (e) => {
        this.setState({
            newDescription: e.target.value
        });
    }
    
    onCancel = () => {
        this.setState({
            isEditable: false,
            newDescription: this.state.list.description
        });
    }
    
    onSubmit = (e) => {
        updateList(this.state.list.id, {
            description: this.state.newDescription
        }).then((response) => {
            this.setState({
                list: response.data,
                isEditable: false
            });
        });
    }
    
    render() {
        const { list, newDescription, isEditable } = this.state;
        return list && (
            <div>
              <section className="hero is-light">
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title is-size-1 has-text-centered">
                      {list.title}
                    </h1>
                    <h2 className="subtitle is-size-3 has-text-centered mb-0">
                      Liste de
                      <ProfileLink username={list.user.username}/>
                    </h2>                    
                    <p className="has-text-centered is-centered">
                      <Avatar
                        avatar={process.env.REACT_APP_API_URL + list.user.avatar}
                        size="is-64x64"
                        alt={list.user.username}
                      />
                    </p>
                    <br/>
                    <div className="columns">
                      <div className="column is-12-mobile is-8 desktop is-offset-2-desktop">
                        <ListDescription
                          list={list}
                          newDescription={newDescription}
                          isEditable={isEditable}
                          onChange={this.onChange}
                          onSubmit={this.onSubmit}
                          onCancel={this.onCancel}
                          onEdit={this.onEdit}
                        />                    
                      </div>                      
                    </div>
                  </div>
                </div>
              </section>
              <div className="columns is-multiline is-mobile">
                <div className="column is-12-mobile is-8-desktop is-offset-2-desktop">
                  <ListContent
                    list={list}
                  />
                  <br className="mt-6 mb-6"/>
                  <LikeDislikePanel
                    numVoteUp={list.num_vote_up}
                    onToggleVoteUp={() => {this.onToggleVote("up");}}
                    numVoteDown={list.num_vote_down}
                    onToggleVoteDown={() => {this.onToggleVote("down");}}
                    loggedUserVote={list.user_vote}
                  />              
                  <br className="mt-6 mb-6"/>
                  <UserSummaryPanel
                    user={list.user}
                  />                
                </div>
              </div>              
            </div>
        );
    }
}
