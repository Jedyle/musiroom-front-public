import React from 'react';
import GalleryItem from './Item';

const Gallery = ({albums, showIndex=false}) => (
    <div className="container is-fluid">
      <div className="columns is-multiline is-mobile is-marginless">
        {albums.map((album, index) => (
            <div className="column is-6-mobile is-4-tablet is-2-desktop"
                 key={index}
            >

              <GalleryItem
                album={album}
                index={index}
                showIndex={showIndex}
              />
            </div>
        ))}
      </div>
    </div>
);

export default Gallery;
