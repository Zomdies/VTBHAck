import React, { useReducer } from 'react';
import './App.css';
import './sass/VTB.css';
import Context from './Context'


import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import SignIn from './Pages/SignIn';
import Payment from './Pages/Payment';
import SignUp from './Pages/SignUp';

import loginReduser from "./reducers/loginReducer"
import tokenReducer from "./reducers/tokenReducer"
import idReducer from "./reducers/idReducer"

function App() {

  const [login, dispatchLogin] = useReducer(loginReduser, false)
  const [token, dispatchToken] = useReducer(tokenReducer, "")
  const [id, dispatchID] = useReducer(idReducer, "")

  return (
    <Context.Provider value={{
      login: login,
      dispatchLogin: dispatchLogin,
      token: token,
      dispatchToken: dispatchToken,
      ID: id,
      dispatchID: dispatchID,
    }}>
      <div className="App">
        <Router>
          <Switch>
            {/* <Route exact path="/" render={() => {
              return <Redirect to="/SignIn" />
            }} /> */}
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Payment" component={Payment} />
            <Redirect from='/' to='/SignIn'/>
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
