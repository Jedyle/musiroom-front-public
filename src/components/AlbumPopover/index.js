import React from 'react';
import 'bulma-popover/css/bulma-popover.css';

const AlbumPopover = (
    {
        button,
        img,
        children
    }
) => (
    <div className="popover is-popover-bottom" >
      <span className="popover-trigger">{button}</span>
      <div className="popover-content has-background-light" style={{"width": "400px"}}>
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <figure className="image is-96x96">
                <img className="avatar" alt="img" src={img}/>
              </figure>
            </div>
            <div className="column">{children}</div>
          </div>
        </div>
      </div>
    </div>
);

export default AlbumPopover;
