import React from 'react';

const AlbumSpotifyLink = ({
    link
}) => (link &&
      <a
        href={link}
        rel="noopener"
        target="_blank"
        className="button is-fullwidth has-background-success has-text-white">
        <i className="fa fa-play-circle" style={{marginRight: '7px'}}></i>
        Spotify
      </a>
);

export default AlbumSpotifyLink;
