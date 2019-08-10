import React from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Prototypes from './components/Prototypes';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="container is-fluid fill">      
      <Router>
        <Navbar/>
        <div className="fill">        
          <Route exact path="/" component={Home}/>
          <Route path="/prototypes" component={Prototypes}/>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
