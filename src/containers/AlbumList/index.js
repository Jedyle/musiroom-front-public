import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlbumItem from 'components/AlbumList/AlbumItem';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Auth/api';
import { getSelfRatings, getSelfInterests, getFolloweesAverage } from 'services/Ratings';
import { getAlbumUrl, getArtistUrl } from 'pages/urls';

class AlbumList extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedUserRatings: {},
            loggedUserInterests: [],
            loggedUserAvgFolloweesRatings: {},            
        };
    }

    componentDidMount(){
        if (this.props.ratedObjects){
            this.fetchDataForLoggedUser();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.ratedObjects !== prevProps.ratedObjects){
            this.fetchDataForLoggedUser();
        }
    }

    fetchDataForLoggedUser(){
        if (getUser()){
            let ratings_ids = this.props.ratedObjects.map(
                (object) => object.rating.id
            );
            getSelfRatings(ratings_ids).then(
                (response) => {
                    this.setState({
                        loggedUserRatings: response.data.ratings
                    });
                }
            );
            getFolloweesAverage(ratings_ids).then(
                (response) => {
                    this.setState({
                        loggedUserAvgFolloweesRatings: response.data.ratings
                    });
                }
            );
            getSelfInterests(ratings_ids).then(
                (response) => {
                    this.setState({
                        loggedUserInterests: response.data.interests
                    });
                }
            );
        }        
    }
    
    getLoggedUserRatingFor(rating_id){
        let userRating = this.state.loggedUserRatings[rating_id.toString()];
        if (userRating){
            return userRating;
        }
        else{
            let userHasInterest = this.state.loggedUserInterests.some(
                id => (id === rating_id)
            );
            if (userHasInterest){
                return (
                    <span className="icon">
                      <i className="fa fa-map-marker"></i>
                    </span>
                );
            }         
        }
        return null;
    }

    getAverageFolloweesRatingsFor(rating_id){       
        let avgRating = this.state.loggedUserAvgFolloweesRatings[rating_id.toString()];
        return avgRating;
    }
    
    render(){
        let { ratedObjects, content, headerContent, ranks, displayRanks } = this.props;
        return ratedObjects.map(
            (object, index) => (
                <AlbumItem
                  key={object.rating.id}
                  cover={object.cover}
                  title={
                      (<Link to={getAlbumUrl(object.mbid)}>
                         {object.title}
                       </Link>)
                  }
                  rank={displayRanks ? ranks[index] : null}
                  user_rating={this.getLoggedUserRatingFor(object.rating.id)}
                  followees_rating={this.getAverageFolloweesRatingsFor(object.rating.id)}
                  avg_rating={parseFloat(object.rating.average)}
                  description={
                      (<span>
                         Album de {object.artists.map(
                             (artist) => (
                                 <Link to={getArtistUrl(artist.mbid)}>
                                   {artist.name}
                                 </Link>
                             )
                         ).reduce(
                             (prev, curr) => [prev, ',', curr]
                         )}
                       </span>)
                  }
                  headerContent={headerContent && headerContent[object.rating.id]}
                  content={content[object.rating.id]}
                />)
        );
    }
}

AlbumList.propTypes = {
    ratedObjects: PropTypes.array.isRequired,
    content: PropTypes.object.isRequired
};

export default AlbumList;

