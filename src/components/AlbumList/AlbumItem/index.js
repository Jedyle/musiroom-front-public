import React from 'react';
import './index.css';

const AlbumItem = (
    {
        cover,
        title,
        description,
        content,
        user_rating,
        followees_rating,
        avg_rating
    }
) => (
    <div className="columns has-background-light is-mobile"
         style={{borderBottom: '0.5px solid lightgrey'}}>
      <div className="column is-2-mobile is-one-quarter-tablet is-marginless">
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src={cover} alt="album" />
            </figure>
          </div>
        </div>
      </div>
      <div className="column is-10-mobile is-three-quarters-tablet"
           style={{paddingLeft: "1.5rem"}}>
        <div className="columns is-mobile">
          <div className="column">
            <p className="title is-size-6-mobile is-size-3-desktop" style={{marginBottom: '0.5rem'}}>{title}</p>
            <p className="is-size-7-mobile is-size-6-desktop">{description}</p>
            <br/>
            <div>{content}</div>
          </div>
          <div className="column is-3">
            <div className="tags are-medium is-pulled-right">
              {
                  user_rating ? (
                      <span className="tag is-user-rating"
                            title="Ma note">
                        {user_rating}
                      </span>
                  ) : ""
              }
              {
                  followees_rating ? (
                      <span className="tag is-followees-rating"
                            title="Moyenne de mes abonnements">
                        {followees_rating}
                      </span>
                  ) : ""
              }
              {
                  avg_rating ? (
                      <span className="tag is-avg-rating"
                            title="Note moyenne">
                        {avg_rating}
                      </span>
                  ) : ""
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default AlbumItem;
