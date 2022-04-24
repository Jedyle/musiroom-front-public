import React from 'react';
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prototypes from './pages/Prototypes';
import { ProfileWithTabs, ProfileWithEditForm } from './pages/Profile/pages';
import './App.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { profileUrl, changeProfileUrl, discussionsUrl, discussionCreateUrl, getAlbumUrl, getArtistUrl, getDiscussionUrl, getDiscussionsUrlForObject, getGenresUrl, getGenreUrl, createGenreUrl, getSearchUrl, getNotificationsUrl, listListsUrl, createListUrl, getListUrl, getTopUrl, getRegistrationUrl, activateAccountUrl, getAllActivityUrl, getSelfActivityUrl, createExportUrl, exportTaskLaunchedUrl, listExportsUrl, getExportUrl, listConversationsUrl } from 'pages/urls';
import LoginForm from 'components/LoginForm';
import { PublicRoute, PublicRouteRender } from 'pages/Router/PublicRoute';
import { PrivateRoute, PrivateRouteRender } from 'pages/Router/PrivateRoute';
import DiscussionsList from 'pages/Discussions/List';
import DiscussionCreate from 'pages/Discussions/Create';
import DiscussionRetrieve from 'pages/Discussions/Retrieve';
import AlbumDetails from 'pages/Album';
import ArtistDetails from 'pages/Artist';
import GenreList from 'pages/Genres/List';
import GenreRetrieve from 'pages/Genres/Retrieve';
import GenreCreate from 'pages/Genres/Create';
import Search from 'pages/Search';
import Notifications from 'pages/Notifications';
import ListsList from 'pages/Lists/List';
import CreateList from 'pages/Lists/Create';
import RetrieveList from 'pages/Lists/Retrieve';
import Top from 'pages/Tops';
import Registration from 'pages/Registration';
import ActivateAccount from 'pages/Registration/activateAccount';
import Activity from 'pages/Activity';
import ExportCreate from 'pages/Exports/Create';
import ExportTaskLaunched from 'pages/Exports/TaskLaunched';
import ExportsList from 'pages/Exports/List';
import ExportRetrieve from 'pages/Exports/Retrieve';
import Conversations from 'pages/Conversations';

const NotFound = () => {
    let history = useHistory();
    history.push("/");
    return (
        <div>          
          <h1>This page was not found</h1>
        </div>
    )
};

const mbidRegex = "([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})";

// a period can be either 'tout' (replace by all for multilanguage), a year, or a decade (like 2010s)
const periodRegex = "(all|[0-9]{4}|[0-9]{3}0s)";

function App() {
    return (
        <React.Fragment>
          <div id="page-container">
            <Router>
              <Navbar />
              <div className="fill">
                <Switch>
                  <PrivateRouteRender
                    exact
                    path={getAllActivityUrl()}
                    render={props => <Activity key='all' type='all'/>}
                  />
                  <PrivateRouteRender
                    exact
                    path={getSelfActivityUrl()}
                    render={props => <Activity key='self' type='self'/>}
                  />                  
                  <PrivateRoute
                    exact
                    path={getNotificationsUrl()}
                    component={Notifications}
                  />
                  <PublicRoute
                    exact path={getRegistrationUrl()}
                    component={Registration}
                  />
                  <PublicRouteRender
                    exact path={activateAccountUrl()}                    
                    render={props => {
                        let query = queryString.parse(props.location.search);
                        return (                     
                            <ActivateAccount
                              uid={query.uid}
                              token={query.token}
                            />
                        );
                    }}
                  />
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/prototypes" component={Prototypes}/>
                  <Route exact path={getSearchUrl()}
                         render={props => {
                             let query = queryString.parse(props.location.search);
                             return (
                                 <Search
                                   key={props.location.search}
                                   model={query.model}
                                   query={query.query}
                                   page={query.page || 1}
                                 />
                             );
                         }}/>
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
                  <Route exact path={getTopUrl()}
                         render = {props => (
                             <Top
                               genre="all"
                               period="all"
                               key="all"
                             />
                         )}
                  />
                  <Route exact path={getTopUrl(":genre", `:period${periodRegex}`)}
                         render = {props => (
                             <Top
                               genre={props.match.params.genre}
                               period={props.match.params.period}
                               key={props.match.params.genre + props.match.params.period}
                             />
                         )}
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
                  <Route exact path={listListsUrl()}
                         render={props => <ListsList
                                            {...props}
                                            key={props.location.search}
                                          />}
                  />
                  <Route exact path={createListUrl()}
                         render={props => <CreateList
                                            {...props}
                                          />}
                  />
                  <Route exact path={getListUrl(":listId(\\d+)")}
                         render={props => <RetrieveList
                                            key={props.match.params.listId}
                                            {...props}
                                          />}
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
                  <Route path={getAlbumUrl(`:mbid${mbidRegex}`)}
                         render={props => {
                             return (<AlbumDetails
                            key={props.match.params.mbid}
                            {...props}
               />);
                         }}
                  />
                  <Route exact path={getArtistUrl(`:mbid${mbidRegex}`)}
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
                  <PrivateRoute exact path={createExportUrl()}
                                component={ExportCreate}
                  />
                  <PrivateRoute exact path={exportTaskLaunchedUrl()}
                                component={ExportTaskLaunched}
                  />
                  <PrivateRoute exact path={listExportsUrl()}
                                component={ExportsList}                    
                  />
                  <PrivateRouteRender
                    exact
                    path={getExportUrl(":exportId(\\d+)")}
                    render={
                        (props) =>
                            <ExportRetrieve
                              id={props.match.params.exportId}
                            />
                    }                    
                  />
                  <PrivateRoute
                    path={listConversationsUrl()}
                    component={Conversations}
                  />
                  <Route path="*" component={NotFound}/>
                </Switch>
              </div>
              <LoginForm/>
            </Router>
          </div>
          <Footer/>
        </React.Fragment>
    );
}

export default App;
