import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './Pages/Landing/LandingPage'
import { Navbar } from './components/NavBar';
function App() {


    return (
        <Router>

            <Navbar />
            <Switch>
                <Route exact path='/' component={LandingPage} />
            </Switch>
        </Router>
    );
}
export default App;
