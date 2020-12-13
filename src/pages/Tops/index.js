import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { listAllGenres } from 'services/Genres';
import { range } from 'utils/numbers';
import { getTopUrl } from 'pages/urls';
import { getTop } from 'services/Tops';
import AlbumList from 'containers/AlbumList';

const TopForm = ({onChange, currentGenre, currentPeriod, genres=[]}) => {
    let currentYear = new Date().getFullYear();
    let decades = range(1950, currentYear, 10).map((decade) => `${decade}s`).reverse();
    let years = range(1950, currentYear).reverse();
    return (
        <div className="mb-5">
          <div className="field">
            <label className="label">Genre</label>
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select value={currentGenre} onChange={(e) => onChange(e.target.value, currentPeriod)}>
                  <option value="tout">Tout</option>
                  {genres.map((genre) => (
                      <option value={genre.slug}>
                        {genre.name}
                      </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Période</label>
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select value={currentPeriod} onChange={(e) => onChange(currentGenre, e.target.value)}>
                  <option value="tout">Tout</option>
                  <option disabled>──────────</option>
                  {
                      decades.map((decade) => (
                          <option value={decade}>{decade}</option>
                      ))
                  }                      
                  <option disabled>──────────</option>
                  {
                      years.map((year) => (
                          <option value={year}>{year}</option>
                      ))
                  }                                            
                </select>
              </div>
            </div>
          </div>
        </div>
    );
};

class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            topAlbums: []
        };
    }
    
    changeTopPage = (genre, period) => {
        this.props.history.push(getTopUrl(genre, period));
    }

    componentDidMount(){
        let { genre, period } = this.props;
        
        listAllGenres().then((response) => {
            this.setState({
                genres: response.data
            });
        });

        getTop(
            {
                genre: genre,
                period: period
            }
        ).then((response) => {
            this.setState({
                topAlbums: response.data
            });
        });        
    }
    
    render() {
        let { genre, period } = this.props;
        let { genres, topAlbums } = this.state;
        return (
            <div className="columns is-mobile is-multiline">
              <div className="column is-12">
                <br/>
                <section className="hero has-border has-background-white-ter">
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title has-text-centered is-size-1">
                        Top 100 Albums
                      </h1>
                    </div>
                  </div>
                </section>
              </div>

              <div className="column">
                <div className="columns is-mobile is-multiline">
                  <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop has-background-white-ter">
                    <TopForm
                      currentGenre={genre}
                      currentPeriod={period}
                      genres={genres}
                      onChange={this.changeTopPage}                      
                    />
                    <hr style={{backgroundColor: '#d7d3d3'}}/>
                    <AlbumList
                      ranks={topAlbums.map((item, index) => (index + 1))}
                      displayRanks={true}
                      ratedObjects={topAlbums}
                      content={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default withRouter(Top);