import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Logo from 'components/Logo';
import { getUser } from 'services/Auth/api';
import { profileUrl, discussionsUrl, getGenresUrl, listListsUrl, getRegistrationUrl, listConversationsUrl, getTopUrl } from 'pages/urls';
import { changeProfileUrl } from 'pages/urls';
import SearchInput from 'containers/Search/Input';
import NotificationBell from 'containers/NotificationBell';

class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            burger_active: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.setBurgerInactive();
        }
    }

    userButtons(){
        if (!this.props.token){
            return (
                <div className="buttons">
                  <Link
                    to={getRegistrationUrl()}
                    onClick={this.setBurgerInactive}
                  >
                    <button className="button is-primary">
                      <strong>Register</strong>
                    </button>
                  </Link>                 
                  <button className="button is-light" onClick={this.props.onLogin}>Log In</button>
                </div>
            );
        }
        else {
            return (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    {this.props.user ? this.props.user.username : "My Account"}
                  </a>
                  <div className="navbar-dropdown is-right">
                    <Link
                      to={profileUrl(getUser())}
                      onClick={this.setBurgerInactive}
                      className="navbar-item"
                    >Account</Link>
                    <Link
                      className="navbar-item"
                      to={listConversationsUrl()}
                      onClick={this.setBurgerInactive}
                    >Messages</Link>
                    {/* <Link className="navbar-item" to={listExportsUrl()}>Mes exports</Link> */}
                    <Link
                      className="navbar-item"
                      to={changeProfileUrl()}
                      onClick={this.setBurgerInactive}
                    >Settings</Link>
                    <Link
                      className="navbar-item"
                      onClick={this.props.onLogout}
                    >Logout</Link>
                    </div>
                </div>                
            );
        }
    };

    activeClass = () => {
        return this.state.burger_active ? 'is-active' : '';
    }

    setBurgerInactive = () => {
        this.setState({
            burger_active: false
        })
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
                   onClick={() => { //
                       this.setState({burger_active: !this.state.burger_active});
                   }}>
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
                    to={discussionsUrl()}>
                    Discussions
                  </Link>

                  <Link
                    className="navbar-item"
                    to={listListsUrl()}>
                    Lists
                  </Link>

                  <Link
                    className="navbar-item"                    
                    to={getGenresUrl()}>
                    Genres
                  </Link>                  

                  {/* { this.props.token && */}
                  {/*   ( */}
                  {/*       <Link */}
                  {/*         className="navbar-item" */}
                  {/*         to={createExportUrl()}> */}
                  {/*         Export */}
                  {/*       </Link> */}
                  {/*   ) */}
                  {/* } */}
                  
                </div>

                <div className="navbar-end" style={{'paddingRight': '10px'}}>
                  <div className="navbar-item">
                    <SearchInput
                      onSubmit={this.setBurgerInactive}
                    />
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


export default withRouter(Navbar);
