import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';
import { getUser } from 'services/Auth/api';
import { profileUrl, discussionsUrl, getGenresUrl } from 'pages/urls';
import { changeProfileUrl } from 'pages/urls';
import SearchInput from 'components/Search/SearchInput';
import NotificationBell from 'components/Notifications/Bell';

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            burger_active: false
        };
    }

    userButtons(){
        if (!this.props.token){
            return (
                <div className="buttons">
                  <button className="button is-primary">
                    <strong>Inscription</strong>
                  </button>
                  <button className="button is-light" onClick={this.props.onLogin}>Connexion</button>
                </div>
            );
        }
        else {
            return (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    {this.props.user ? this.props.user.username : "Mon Compte"}
                  </a>
                  <div className="navbar-dropdown">
                    <Link to={profileUrl(getUser())} className="navbar-item">Profil</Link>
                    <Link className="navbar-item">Messagerie</Link>
                    <Link className="navbar-item">Mes exports</Link>
                    <Link className="navbar-item" to={changeProfileUrl()}>Modifier mes infos</Link>
                    <Link className="navbar-item" onClick={this.props.onLogout}>Déconnexion</Link>
                    </div>
                </div>                
            );
        }
    };

    activeClass(){
        return this.state.burger_active ? 'is-active' : '';
    }
    
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation"
                 style={{height: "52px"}}>
              <div className="navbar-brand">
                <a className="navbar-item is-paddingless-bottom" href="https:lamusitheque.com">
                  <Logo/>
                </a>
                
                <a role="button"
                   className={`navbar-burger burger ${this.activeClass()}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                   onClick={() => {this.setState({burger_active: !this.state.burger_active});}}>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" className={`navbar-menu ${this.activeClass()}`}>
                <div className="navbar-start">
                  <Link className="navbar-item" to="/">
                    Home
                  </Link>
                  
                  <Link
                    className="navbar-item"
                    to="/prototypes">
                    Documentation
                  </Link>

                  <Link
                    className="navbar-item"
                    to={getGenresUrl()}>
                    Genres
                  </Link>

                  <Link
                    className="navbar-item"
                    to={discussionsUrl()}>
                    Discussions
                  </Link>

                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                      Token : {this.props.token}
                    </a>

                    <div className="navbar-dropdown">
                      <a className="navbar-item">
                        About
                      </a>
                      <a className="navbar-item">
                        Jobs
                      </a>
                      <a className="navbar-item">
                        Contact
                      </a>
                      <hr className="navbar-divider"/>
                      <a className="navbar-item">
                        Report an issue
                      </a>
                    </div>
                  </div>                  
                </div>

                <div className="navbar-end" style={{'paddingRight': '10px'}}>
                  <div className="navbar-item">
                    <SearchInput />
                  </div>

                  { this.props.token &&
                    (
                        <div className="navbar-item">
                          <NotificationBell
                          />
                        </div>
                    )
                  }
                  
                  {this.userButtons()}
                </div>
              </div>
            </nav>
        );
    }
}


export default Navbar;
