import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
// import Layout from './components/Layout/index';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector} from 'react-redux';
import {isUserLoggedIn} from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  },[]);

  return (
    <div className="App">
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
