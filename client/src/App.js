import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import { Provider } from 'react-redux'; 
// import redux store
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

// check for logged in user's token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user who is authenticated
  store.dispatch(setCurrentUser(decoded));
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
            </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
