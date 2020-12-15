import React from 'react';

const Avatar = ({avatar, size, alt, figureStyle={}, imgStyle={}}) => (
    <figure className={`image ${size}`} style={{display: "inline-block", ...figureStyle}}>
      <img className="is-rounded" src={avatar} style={{height: '100%', 'width':'100%', ...imgStyle}} alt={alt}/>
    </figure>
);

export default Avatar;
