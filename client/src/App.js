import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux'; 
// import redux store
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

// check for logged in user's token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user who is authenticated
  store.dispatch(setCurrentUser(decoded));

  // check token expiration
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout the user if expired
    store.dispatch(logoutUser());

    // clear profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/dashboard" component={Dashboard}/>
            </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
