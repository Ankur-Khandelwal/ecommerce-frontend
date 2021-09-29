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
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import { getInitialData } from './actions/initialData.action';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute path="/products" exact component={Products}/>
        <PrivateRoute path="/orders" exact component={Orders}/>
        <PrivateRoute path="/category" exact component={Category}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
