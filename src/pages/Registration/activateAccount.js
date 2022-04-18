import React, { Component } from 'react';
import { confirmToken } from 'services/Registration';
import Title from 'components/Utils/Title';

export default class ActivateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLinkConfirmed: false,
            isLinkInvalid: false
        };
    }

    componentDidMount(){
        let { token, uid } = this.props;
        confirmToken(token, uid).then((response) => {
            this.setState({isLinkConfirmed: true});
        }).catch(error => {
            this.setState({
                isLinkInvalid: true
            });
        });
    }
    
    render() {
        let { isLinkConfirmed, isLinkInvalid } = this.state;
        return (
            <div className="columns">
              <div className="column">
                { isLinkConfirmed ?
                  (
                      <div>
                        <Title title="Account activated"/>
                        You may now log in !
                      </div>
                  ) :
                  (                      
                      isLinkInvalid ?
                          (
                              <div>
                                <Title title="Invalid link"/>
                                Invalid or expired token</div>
                          ) :
                          (
                              <div>Loading...</div>
                          )
                  )
                }
              </div>
            </div>
        );
    }
}
