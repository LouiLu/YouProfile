import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
//
import setAuthToken from '../utils/setAuthToken';

// Register function 
export const registerUser = (userData, history) => dispatch => {
      axios.post('/api/users/register', userData)
         .then(res => history.push('/login'))
         .catch(err => 
            dispatch({
               type: GET_ERRORS,
               payload: err.response.data
            }) 
         );
};

// Login - get token
export const loginUser = (userData) => dispatch => {
   axios.post('/api/users/login', userData)
      .then(res => {
         // save token to local 
         const { token } = res.data;

         // set token to storage
         localStorage.setItem('jwtToken', token);

         // set token to auth header
         setAuthToken(token);

         // decode token to user data
         const decoded = jwt_decode(token);

         // set current user
         dispatch(setCurrentUser(decoded));
      })
      .catch(err => 
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         }) 
      );
};

// set logged in user
export const setCurrentUser = (decoded) => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   }
}

// logout user
export const logoutUser = () => dispatch => {
   // remove token from local storage
   localStorage.removeItem('jwtToken');

   // remove auth header for requests
   setAuthToken(false);

   // set current user to empty
   dispatch(setCurrentUser({}));
}