import React from 'react';

const ActivityFeedItem = (
    {
        img,
        author,
        verb,
        object,
        date
    }
) => (
    <li className="list-item columns is-mobile">
      <div style={{"width": "70px"}}>
        <figure className="image is-64x64">
          <img className="avatar" alt="img" src={img}/>
        </figure>
      </div>
      <div className="column is-paddingless">
        <div className="columns is-multiline is-mobile">
          <p className="column is-12">{author}{' '}{verb}{' '}{object}</p>
          <p className="column is-12" style={{"padding-top": "0.25rem"}}>
            <small className="is-pulled-right">{date}</small></p>
        </div>
      </div>
    </li>
);


export default ActivityFeedItem;
