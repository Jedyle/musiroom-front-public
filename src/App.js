import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Prototypes from './pages/Prototypes';
import { ProfileWithTabs, ProfileWithEditForm } from './pages/Profile/pages';
import './App.scss';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { profileUrl, changeProfileUrl } from 'pages/urls';
import PrivateRoute from 'pages/Router/PrivateRoute';

function App() {
    return (
        <React.Fragment>
          <div id="page-container">
            <Router>
              <Navbar />
              <div className="fill">
                <Route exact path="/" component={Home}/>
                <Route path="/prototypes" component={Prototypes}/>
                <Route path={profileUrl(":username")}
                       render={props => {
                           return (
                               <ProfileWithTabs
                                 key={props.match.params.username}
                                 username={props.match.params.username}
                                 {...props}
                               />
                           );
                       }}
                />
                <PrivateRoute path={changeProfileUrl()}
                              component={ProfileWithEditForm}
                />                
              </div>
            </Router>
          </div>
          <Footer/>
        </React.Fragment>
    );
}

export default App;
