import React from 'react';
import 'bulma-popover/css/bulma-popover.css';

const AlbumPopover = (
    {
        img,
        children
    }
) => (
    <div className="popover is-popover-bottom" >
      <button className="button is-primary popover-trigger">Table Popover</button>
    <div className="popover-content has-background-grey-lighter" style={{"width": "400px"}}>
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
