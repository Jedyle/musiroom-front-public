import React, { Component } from 'react';
import { confirmToken } from 'services/Registration';

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
                        Vous pouvez maintenant vous connecter !
                      </div>
                  ) :
                  (                      
                      isLinkInvalid ?
                          (
                              <div>Token invalide ou expiré</div>
                          ) :
                          (
                              <div>Confirmation en cours...</div>
                          )
                  )
                }
              </div>
            </div>
        );
    }
}
