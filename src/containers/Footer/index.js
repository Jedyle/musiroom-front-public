import React from 'react';
import Feedback from 'containers/Feedback';

const Footer = () => (
    <footer id="footer" className="is-paddingless">
      <br/>
      <div className="content has-text-centered">
        <span>&#169;</span> MusiRoom - 2022 - {" "}
        <Feedback />
      </div>
    </footer>
);

export default Footer;
