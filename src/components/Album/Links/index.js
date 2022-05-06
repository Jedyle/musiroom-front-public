import React from 'react';

const AlbumLinks = ({youtube, spotify}) => (
    <>
      {youtube &&
       <a
         href={youtube}
         rel="noopener"
         target="_blank"
         className="button is-fullwidth has-background-sanguine has-text-white">
         <i className="fa fa-play-circle" style={{marginRight: '7px'}}></i>
         Youtube
       </a>
      }
      {spotify &&      
       <a
         href={spotify}
         rel="noopener"
         target="_blank"
         className="button is-fullwidth has-background-success has-text-white">
         <i className="fa fa-play-circle" style={{marginRight: '7px'}}></i>
         Spotify
       </a>      
      }
    </>
);

export default AlbumLinks;
