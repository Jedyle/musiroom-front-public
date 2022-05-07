import React from 'react';


const AlbumItem = (
    {
        mbid,
        media_cover,
        title,
        description,
        content,
        ratingsComponent,
        rank,
        headerContent
    }
) => (
    <div className="columns is-marginless is-mobile">
      {headerContent &&
       <div className="column is-narrow">
         {headerContent}
       </div>
      }
      <div className="column">
        <div className="columns has-background-light is-mobile"
             style={{borderBottom: '0.5px solid lightgrey'}}
        >
          <div className="column is-one-quarter is-marginless">
            <div className="card">
              <div className="card-image">
                <figure className="image is-square">
                  <img src={media_cover} alt="album" />
                </figure>
              </div>
            </div>
          </div>          
          <div className="column is-three-quarters"
               style={{paddingLeft: "1.5rem"}}>
            <div className="columns is-mobile is-multiline">
              <div className="column is-12-mobile is-8-desktop">
                <p className="title is-size-5-mobile is-size-3-desktop" style={{marginBottom: '0.2rem'}}>
                  {rank &&
                   (<>
                      {rank}. {" "}
                    </>
                   )               
                  }
                  {title}
                </p>
                <p className="is-size-6-mobile is-size-6-desktop">{description}</p>
              </div>
              <div className="column is-12-mobile is-2-tablet is-4-desktop">
                {ratingsComponent}
              </div>
              <div className="column is-12">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default AlbumItem;
