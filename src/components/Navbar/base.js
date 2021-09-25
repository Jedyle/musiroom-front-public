import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';
import { getUser } from 'services/Auth/api';
import { profileUrl, discussionsUrl, getGenresUrl, listListsUrl, getRegistrationUrl, createExportUrl, listExportsUrl, listConversationsUrl, getTopUrl } from 'pages/urls';
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
                  <Link to={getRegistrationUrl()}>
                    <button className="button is-primary">
                      <strong>Inscription</strong>
                    </button>
                  </Link>                 
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
                  <div className="navbar-dropdown is-right">
                    <Link to={profileUrl(getUser())} className="navbar-item">Profil</Link>
                    <Link className="navbar-item" to={listConversationsUrl()}>Messagerie</Link>
                    <Link className="navbar-item" to={listExportsUrl()}>Mes exports</Link>
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
                <Link className="navbar-item is-paddingless-bottom" to="">
                  <Logo/>
                </Link>
                
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

                  <Link
                    className="navbar-item"
                    to={getTopUrl()}>
                    Tops
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

                  <Link
                    className="navbar-item"
                    to={listListsUrl()}>
                    Listes
                  </Link>

                  { this.props.token &&
                    (
                        <Link
                          className="navbar-item"
                          to={createExportUrl()}>
                          Export
                        </Link>
                    )
                  }
                  
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
