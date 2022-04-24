import React, { Component } from 'react';
import { getUser } from 'services/Auth/api';
import { toHumanDate } from 'utils/date';
import { UserLink } from 'containers/Links';
import Avatar from 'components/Profile/Avatar';

import './index.css';


const Message = ({message}) => {
    let isAuthor = getUser() === message.user.username;
    return (
        <div className={`column is-7 ${isAuthor && 'is-offset-5'}`}>
          <div className="columns mb-0">
            <div className="column is-narrow pb-1 pr-1">
              <Avatar
                avatar={process.env.REACT_APP_API_URL + message.user.avatar}
                alt={message.user.username}
                size="is-24x24"
                figureStyle={{display: "auto"}}
              />
            </div>
            <div className="column pb-1 pl-1">
              <p >
                {" "}
                <UserLink username={message.user.username}/>
              </p>
            </div>             
          </div>                   
          <article className={`message mb-0 ${isAuthor ? 'is-success' : 'is-dark'}`}>
            <div className="message-body">
              {message.text}
            </div>
          </article>
          <p className={`${isAuthor && 'is-pulled-right'}`}>
            <i>{" "} {toHumanDate(message.date)}</i>            
          </p>          
        </div>
    );
};

class Conversation extends Component{

    firstMessageRef = React.createRef()
    infiniteRef = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            loadArea: 30,
            currentPage: 1,
            scrollPosition: 0,
            isLoading: false
        };
    }
    
    componentDidMount(){
        this.props.loadMore(1);
        setTimeout(() => this.scrollToBottom(), 1000);
        if (this.infiniteRef.current){
            this.infiniteRef.current.addEventListener("scroll", this.handleScrollToTop);        
        }
    }

    componentWillUnmount(){
        if (this.infiniteRef.current){
            this.infiniteRef.current.removeEventListener("scroll", this.handleScrollToTop);
        }
    }

    scrollToBottom = () => {
        if (this.firstMessageRef.current){
            this.firstMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleScrollToTop = () => {
        // Handle scroll direction        
        if (this.infiniteRef.current.scrollTop > this.state.scrollPosition) {
            // Scroll bottom
        } else {
            // Check loadmore scroll area
            if (this.infiniteRef.current.scrollTop <= this.state.loadArea && !this.props.isLoading) {
                // Check for available data
                if (this.props.hasMore) {
                    // Run data fetching
                    const nextPage = this.state.currentPage + 1;
                    this.setState({ currentPage: nextPage });
                    this.props.loadMore(nextPage);
                }
            }
        }
        // Save event scroll position
        this.setState({ scrollPosition: this.infiniteRef.current.scrollTop });
    };
    
    render(){        
        let { messages, loader, isLoading } = this.props;        
        return (
            <div className="columns is-mobile is-multiline has-border mr-3 ml-3" style={{maxHeight: '600px', overflowY: 'scroll'}}
                 ref={this.infiniteRef}
            >
              <div className="column reverse">
                <div id="firstMessageDiv" style={{ float:"left", clear: "both" }}
                     ref={this.firstMessageRef}>
                </div>
                {
                  messages.map(
                      (message) =>
                          <Message key={message.id} message={message}/>
                  )
                }
                {isLoading && loader}
              </div>              
            </div>
        );
    }
    
}

export default Conversation;
