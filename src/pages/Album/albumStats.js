import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAlbumRatingStats } from 'services/Ratings';

const RatingsChart = ({
    labels,
    data,
    bgColor
}) => (
    <Bar
      data={
          {
              labels: labels,
              datasets: [
                  {                                   
                      backgroundColor: bgColor,
                      data: data
                  }
              ]
          }
      }
      options={
          {
              legend: {
                  display: false
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                          display: false,
                      },
                      ticks:{
                          display: false
                      },
                      categoryPercentage: 1.0,
                      barPercentage: 1.0
                  }],
                  yAxes: [{
                      gridLines: {
                          display: false,
                      },
                      ticks:{
                          display: false
                      }
                  }]
              }
          }
      }
    />);

class AlbumStats extends Component {

    constructor(props){
        super(props);
        this.state = {
            generalStats: null  
        };
    }

    componentDidMount(){
        getAlbumRatingStats(this.props.album.rating.id).then(
            (response) => {
                this.setState({
                    generalStats: response.data
                });
            }  
        );
    }

    render(){
        console.log(this.state.generalStats);
        if (this.state.generalStats){
            return (
                <div className="columns is-mobile has-border has-margin-right-10">
                  <div className="column is-4">
                    <h1 className="is-marginless has-text-centered title is-size-1">
                      {parseFloat(this.state.generalStats.average).toFixed(1)}
                    </h1>
                    <p className="has-text-centered has-margin-top-10">
                      <span className="icon">
                        <i className="fa fa-user"></i>
                      </span>
                      {this.state.generalStats.count}
                    </p>
                  </div>
                  <div className="column is-8">
                    <RatingsChart
                      bgColor="grey"
                      {...this.state.generalStats.stats}
                    />
                  </div>
                </div>
            );
        }
        return (<div></div>);
    };
}

export default AlbumStats;
