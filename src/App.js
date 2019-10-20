import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Prototypes from './pages/Prototypes';
import Profile from './pages/Profile';
import './App.scss';
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <React.Fragment>
          <div id="page-container">
            <Router>
              <Navbar />
              <div className="fill">
                <Route exact path="/" component={Home}/>
                <Route path="/prototypes" component={Prototypes}/>
                <Route path="/profil/u/:username" component={Profile}/>
              </div>
            </Router>
          </div>
          <Footer/>
        </React.Fragment>
    );
}

export default App;
