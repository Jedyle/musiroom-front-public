import React from 'react';

const AlbumYoutubeLink = ({
    link
}) => (
      <a
        href={link}
        rel="noopener"
        target="_blank"
        className="button is-fullwidth has-background-sanguine has-text-white">
        <i className="fa fa-play-circle" style={{marginRight: '7px'}}></i>
        Écouter un extrait
      </a>
);

export default AlbumYoutubeLink;
