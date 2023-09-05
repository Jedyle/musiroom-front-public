import React, { Component } from 'react';
import { getAlbumRatingStats} from 'services/Ratings';
import RatingsChart from '../RatingsChart';


export default class AllRatingsStats extends Component {

    constructor(props){
        super(props);
        this.state = {
            stats: null
        };
    }

    componentDidMount(){
        if(this.props.album.rating){
            getAlbumRatingStats(this.props.album.rating.id).then(
                (response) => {
                    this.setState({
                        stats: response.data
                    });
                }
            );
        }
    }

    render(){
        return (
            <>
              <p className="title has-text-centered is-size-5">Average Rating</p>
              {
                  this.state.stats ?
                      (
                          <RatingsChart
                            stats={this.state.stats}
                            chartColor={this.props.chartColor}
                            textClass={this.props.textClass}
                          /> )    : (<div className="has-text-centered">No rating</div>)
              }
            </>
        );
    };
}
