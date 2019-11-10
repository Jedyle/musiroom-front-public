import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Prototypes from './pages/Prototypes';
import { ProfileWithTabs, ProfileWithEditForm } from './pages/Profile/pages';
import './App.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { profileUrl, changeProfileUrl, discussionsUrl, discussionCreateUrl, getAlbumUrl } from 'pages/urls';
import PrivateRoute from 'pages/Router/PrivateRoute';
import DiscussionsList from 'pages/Discussions/List';
import DiscussionCreate from 'pages/Discussions/Create';
import AlbumDetails from 'pages/Album';

const NotFound = () => (
    <div>
      <h1>That page was not found</h1>
    </div>
);

function App() {
    return (
        <React.Fragment>
          <div id="page-container">
            <Router>
              <Navbar />
              <div className="fill">
                <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/prototypes" component={Prototypes}/>
                <Route exact path={discussionsUrl()}
                       render = {props => {
                           return (
                               <DiscussionsList
                                 object_id={null}
                                 model={null}
                                 key={props.location.search}
                                 {...props}
                               />  
                           );
                       }}
                />
                <PrivateRoute
                  exact
                  path={discussionCreateUrl()}
                  component={DiscussionCreate}
                />
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
                <Route exact path={getAlbumUrl(":mbid([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})")}
                       render={props => {
                           return (<AlbumDetails
                                            key={props.match.params.mbid}
                                            {...props}
                               />);
                       }}
                />
                <PrivateRoute exact path={changeProfileUrl()}
                              component={ProfileWithEditForm}
                />
                  <Route path="*" component={NotFound}/>
                </Switch>
              </div>            
            </Router>
          </div>
          <Footer/>
        </React.Fragment>
    );
}

export default App;
