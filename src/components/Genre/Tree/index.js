import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGenreUrl } from 'pages/urls';


const GenreTree = ({genres, initShowChildren}) => (
    <>
      {genres.map((genre) => (
          <GenreItem
            genre={genre}
            initShowChildren={initShowChildren}
          />
      ))}
    </>
);

class GenreItem extends Component {


    constructor(props){
        super(props);
        this.state = {
            showChildren: this.props.initShowChildren || false,
        };
    }

    render() {
        let genre = this.props.genre;
        let showChildren = this.state.showChildren;
        return (
            <div className="columns is-multiline">
              <div className="column is-narrow" style={{width: '50px'}}>
              </div>
              <div className="column">
                <div className="box">
                  {
                      genre.children.length > 0 ?
                   <span className="icon mr-3"
                         style={{cursor: 'pointer'}}
                         onClick={(e) => {
                             this.setState((prevState) => ({
                                 showChildren: !prevState.showChildren
                             }));
                         }}
                   >
                     {
                         showChildren ?
                             <i className="fa fa-lg fa-chevron-circle-down"></i> :
                         <i className="fa fa-lg fa-chevron-circle-right"></i>
                     }
                   </span> :
                      <span className="icon mr-3"/>
                  }
                  <span className="title is-size-4">
                    <Link to={getGenreUrl(genre.slug)}>
                      {genre.name}
                    </Link>
                  </span>
                </div>
                {
                    genre.children.length > 0 && showChildren &&
                        <GenreTree
                          genres={genre.children}
                          initShowChildren={this.props.initShowChildren}
                        />
                }
              </div>
            </div>
        );
    }
}

export default GenreTree;
