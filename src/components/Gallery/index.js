import React from 'react';

const Gallery = ({images}) => (
    <div className="container is-fluid">
      <div className="columns is-multiline is-mobile is-marginless">
        {images.map((img, index) => (
            <div className="column is-6-mobile is-4-tablet is-2-desktop"
                 key={index}
            >
              <figure key={img} className="image is-square">
                <img alt={img} src={img}/>
              </figure>
            </div>
        ))}
      </div>
    </div>
);

export default Gallery;
