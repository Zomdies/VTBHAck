import React from 'react';
import './App.css';
import './sass/VTB.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignIn from './Pages/SignIn';
import Payment from './Pages/Payment';
import SignUp from './Pages/SignUp';

import { Fetch } from 'react-request';

function App() {



  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return <Redirect to="/SignIn" />
          }} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Payment" component={Payment} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
