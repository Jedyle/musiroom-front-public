import React from 'react';

const ShortAlbumList = (
    {
        albums
    }
) => (
    <div className="list">
      {albums.map((album) => (
          <div className="list-item columns has-margin-left-5" key={album.mbid}>
          <img
            alt={album.title}
            className="has-margin-right-6"
            src={album.media_cover}
            style={{'height': '48px'}}/>
          <div className="column">
            <span style={{verticalAlign: 'middle'}}>
              {album.content}
            </span>
          </div>          
        </div>
    ))}
      </div>
);

export default ShortAlbumList;
