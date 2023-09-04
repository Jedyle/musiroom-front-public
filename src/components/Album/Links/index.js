import React from 'react';

const AlbumLinks = ({youtube, spotify, deezer}) => (
    <>
      {youtube &&
       <a
         href={youtube}
         rel="noopener"
         target="_blank"
         className="button is-fullwidth has-background-sanguine has-text-white mb-1 ml-1">
         <i className="fab fa-youtube" style={{marginRight: '7px'}}></i>
         Youtube
       </a>
      }
      {spotify &&
       <a
         href={spotify}
         rel="noopener"
         target="_blank"
         className="button is-fullwidth has-background-success has-text-white mb-1 ml-1">
         <i className="fab fa-spotify" style={{marginRight: '7px'}}></i>
         Spotify
       </a>
      }
      {deezer &&
       <a
         href={deezer}
         rel="noopener"
         target="_blank"
         className="button is-info is-fullwidth ml-1">
         <i className="fab fa-deezer" style={{marginRight: '7px'}}></i>
         Deezer
       </a>
      }

    </>
);

export default AlbumLinks;
