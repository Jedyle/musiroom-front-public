import React from 'react';

// special gallery for lists, with 5 items per row

import GalleryItem from '../Item';

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const ListGallery = ({albums, showIndex=false}) => {

    const chunks = sliceIntoChunks(albums, 5);
    
    return (
    <div className="container is-fluid">
      <div className="columns is-multiline is-mobile is-marginless">

        {chunks.map(
            (chunk, chunkIndex) => (
                <>
                  <div className="column is-1 is-hidden-mobile"></div>
                  {
                      chunk.map(
                          (album, index) => (
                              <div className="column is-6-mobile is-2-desktop" key={`${chunkIndex}-${index}`}>
                                <GalleryItem
                                  album={album}
                                  index={chunkIndex * 5 + index}
                                  showIndex={showIndex}
                                />    
                              </div>
                          )
                      )
                  }
                  <div className="column is-1 is-hidden-mobile"></div>                  
                </>
            )
            
        )}      
      </div>
    </div>
)};

export default ListGallery;
