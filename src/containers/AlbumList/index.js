import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlbumItem from 'components/AlbumList/AlbumItem';
import RatingTagsList from 'containers/StarRatings/Tags';
import { Link } from 'react-router-dom';
import { getUser } from 'services/Auth/api';
import { getSelfRatings, getFolloweesAverage } from 'services/Ratings';
import { getAlbumUrl, getArtistUrl } from 'pages/urls';

class AlbumList extends Component {

    constructor(props){
        super(props);
        this.state = {
            loggedUserRatings: {},
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

    fetchDataForLoggedUser = () => {
        if (getUser()){
            let ratings_ids = this.props.ratedObjects.map(
                (object) => object.rating.id
            );
            this.updateUserRatings(ratings_ids);
            getFolloweesAverage(ratings_ids).then(
                (response) => {
                    this.setState({
                        loggedUserAvgFolloweesRatings: response.data.ratings
                    });
                }
            );
        }
    }

    updateUserRatings = (ratings_ids) => {
        getSelfRatings(ratings_ids).then(
            (response) => {
                this.setState((prevState) => {
                    let loggedUserRatings = {
                        ...prevState.loggedUserRatings,
                        ...response.data.ratings
                    };
                    let resRatingIds = Object.keys(response.data.ratings);
                    for (const el of ratings_ids){
                        if (!resRatingIds.includes(el.toString())){
                            delete loggedUserRatings[el.toString()]
                        }
                    }
                    return (
                        {
                            loggedUserRatings: loggedUserRatings
                        }
                    )
                })
            }
        )
    }

    getLoggedUserRatingFor = (rating_id) => {
        return this.state.loggedUserRatings[rating_id.toString()];
    }

    getAverageFolloweesRatingsFor = (rating_id) => {
        return this.state.loggedUserAvgFolloweesRatings[rating_id.toString()];
    }

    render(){
        let { ratedObjects, content, headerContent, ranks, displayRanks } = this.props;
        return ratedObjects.map(
            (object, index) => (
                <AlbumItem
                  mbid={object.mbid}
                  key={object.rating.id}
                  media_cover={object.media_cover}
                  title={
                      (<Link to={getAlbumUrl(object.mbid)}>
                         {object.title}
                       </Link>)
                  }
                  rank={displayRanks ? ranks[index] : null}
                  ratingsComponent={
                      <RatingTagsList
                        mbid={object.mbid}
                        ratingId={object.rating.id}
                        userRating={this.getLoggedUserRatingFor(object.rating.id)}
                        followeesRating={this.getAverageFolloweesRatingsFor(object.rating.id)}
                        avgRating={parseFloat(object.rating.average)}
                        onChangeRating={() => this.updateUserRatings([object.rating.id])}
                      />
                  }
                  description={
                      (<span>
                         by {object.artists.map(
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

