import React from 'react';
import './index.css';

const Logo = () => (
    <div className="logo">
      <img className="is-hidden-tablet" src="/logo_crop_black.png" alt="logo" />
      {/* temporary : for non mobile, add long logo when we have a working one */}
      <img className="is-hidden-mobile" src="/logo_crop_black.png" alt="logo" />
    </div>
);

export default Logo;
