import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";

const Root = () => (
    <Router>
      <Route exact path="/" component={Home}/>
      
      {/* <Route path="/prototypes" component={Prototypes} /> */}
    </Router>
);
