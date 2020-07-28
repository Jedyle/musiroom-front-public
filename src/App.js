import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Prototypes from './pages/Prototypes';
import { ProfileWithTabs, ProfileWithEditForm } from './pages/Profile/pages';
import './App.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { profileUrl, changeProfileUrl, discussionsUrl, discussionCreateUrl, getAlbumUrl, getArtistUrl, getDiscussionUrl, getDiscussionsUrlForObject, getReviewUrl, getGenresUrl, getGenreUrl, createGenreUrl } from 'pages/urls';
import PrivateRoute from 'pages/Router/PrivateRoute';
import DiscussionsList from 'pages/Discussions/List';
import DiscussionCreate from 'pages/Discussions/Create';
import DiscussionRetrieve from 'pages/Discussions/Retrieve';
import ReviewRetrieve from 'pages/Reviews/Retrieve';
import AlbumDetails from 'pages/Album';
import ArtistDetails from 'pages/Artist';
import GenreList from 'pages/Genres/List';
import GenreRetrieve from 'pages/Genres/Retrieve';
import GenreCreate from 'pages/Genres/Create';

const NotFound = () => (
    <div>
      <h1>That page was not found</h1>
    </div>
);

const mbidRegex = ":mbid([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})";

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
                  <Route exact path={getGenresUrl()} component={GenreList}/>
                  <Route exact path={getGenreUrl(':slug')}
                         render = {props => (
                             <GenreRetrieve
                               key={props.match.params.slug}
                               genreSlug={props.match.params.slug}
                             />
                         )}
                  />
                  <PrivateRoute exact path={createGenreUrl()}
                                component={GenreCreate}
                  />
                  <Route exact path={discussionsUrl()}
                         render = {props => {
                             return (
                                 <DiscussionsList
                                   objectId={null}
                                   model={null}
                                   key={props.location.search}
                                   {...props}
                                 />  
                             );
                         }}
                  />
                  <Route exact path={getDiscussionsUrlForObject(null, 0)}
                         render={props => (
                             <DiscussionsList
                               key={"general" + props.location.search}
                               objectId={0}
                               model={null}
                             />
                         )}/>
                  <Route exact path={getDiscussionsUrlForObject("album", ":objectId")}
                         render = {props => (
                             <DiscussionsList
                               key={"album" + props.match.params.objectId + props.location.search}
                               model="album"
                               objectId={props.match.params.objectId}
                               {...props}
                             />
                         )}
                  />
                  <Route exact path={getDiscussionsUrlForObject("artist", ":objectId")}
                         render = {props => (
                             <DiscussionsList
                               key={"artist" + props.match.params.objectId + props.location.search}
                               model="artist"
                               objectId={props.match.params.objectId}
                               {...props}
                             />
                         )}
                  />
                  <PrivateRoute
                    exact
                    path={discussionCreateUrl()}
                    component={DiscussionCreate}
                  />
                  <Route exact path={getDiscussionUrl(":discussionId(\\d+)")}
                         render={props => (
                             <DiscussionRetrieve
                               key={props.match.params.discussionId}
                               discussionId={props.match.params.discussionId}
                               {...props}
                             />
                         )}
                    
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
                  <Route exact path={getAlbumUrl(mbidRegex)}
                         render={props => {
                             return (<AlbumDetails
                            key={props.match.params.mbid}
                            {...props}
               />);
                         }}
                  />
                  <Route exact path={getReviewUrl(mbidRegex, ":reviewId")}
                         render={props => 
                             (<ReviewRetrieve
                                key={props.match.params.reviewId}
                                {...props}
                              />)
                         }
                  />
                  <Route exact path={getArtistUrl(mbidRegex)}
                         render={props => {
                             return (<ArtistDetails
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
