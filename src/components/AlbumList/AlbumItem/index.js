import React from 'react';
import RatingTagsList from 'containers/StarRatings/Tags';

const AlbumItem = (
    {
        mbid,
        media_cover,
        title,
        description,
        content,
        user_rating,
        followees_rating,
        avg_rating,
        rank,
        headerContent
    }
) => (
    <div className="columns is-mobile">
      <div className="column is-narrow">
        {headerContent}
      </div>
      <div className="column">
        <div className="columns has-background-light is-mobile"
             style={{borderBottom: '0.5px solid lightgrey'}}
        >
          <div className="column is-2-mobile is-one-quarter-tablet is-marginless">
            <div className="card">
              <div className="card-image">
                <figure className="image is-square">
                  <img src={media_cover} alt="album" />
                </figure>
              </div>
            </div>
          </div>          
          <div className="column is-10-mobile is-three-quarters-tablet"
               style={{paddingLeft: "1.5rem"}}>
            <div className="columns is-mobile">
              <div className="column">
                <p className="title is-size-6-mobile is-size-3-desktop" style={{marginBottom: '0.5rem'}}>
                  {rank &&
                   (<>
    {rank}. {" "}
  </>
                   )               
                  }
                  {title}
                </p>
                <p className="is-size-7-mobile is-size-6-desktop">{description}</p>
                <br/>
                <div>{content}</div>
              </div>
              <div className="column is-2-tablet is-4-desktop">
                <RatingTagsList
                  mbid={mbid}
                  userRating={user_rating}
                  followeesRating={followees_rating}
                  avgRating={avg_rating}
                />             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default AlbumItem;
