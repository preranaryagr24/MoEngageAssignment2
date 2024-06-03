import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Search from './components/Search/Search';
import BreweryDetail from './components/BreweryDetail/BreweryDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={Search} />
        <Route path="/brewery/:id" component={BreweryDetail} />
      </Switch>
    </Router>
  );
}

export default App;
