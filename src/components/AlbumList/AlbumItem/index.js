import React from 'react';
import './index.css';

const AlbumItem = (
    {
        img,
        title,
        description,
        content,
        user_rating,
        followees_rating,
        avg_rating
    }
) => (
    <div className="columns has-background-light">
      <div className="column is-one-quarter is-marginless is-paddingless">
        <div className="card">
          <div className="card-image">
            <figure className="image is-square">
              <img src={img} alt="album"/>
            </figure>
          </div>
        </div>
      </div>
      <div className="column is-three-quarters"
           style={{"padding-left": "1.5rem"}}>
        <div className="columns is-mobile">
          <div className="column">
            <p className="title is-3" style={{'margin-bottom': '0.5rem'}}>{title}</p>
            <p className="is-6">{description}</p>
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
                            title="Ma note">
                        {followees_rating}
                      </span>
                  ) : ""
              }
              {
                  avg_rating ? (
                      <span className="tag is-avg-rating"
                            title="Ma note">
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
