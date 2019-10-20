import React from 'react';

const FavoriteAlbums = (
    {
        albums
    }
) => (
    <div className="list">
      {albums.map((album) => (
        <div className="list-item columns has-margin-left-5">
          <img
            alt={album.title}
            className="has-margin-right-6"
            src={album.cover}
            style={{'height': '48px'}}/>
          <div className="column">
            <span style={{'vertical-align': 'middle'}}>
              {album.content}
            </span>
          </div>          
        </div>
    ))}
      </div>
);

export default FavoriteAlbums;
