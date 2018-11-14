import axios from 'axios';

const setAuthToken = (token) => {
   if (token) {
      // apply to every api interaction requests
      axios.defaults.headers.common['Authorization'] = token;
   } else {
      // delete the auth header
      delete axios.defaults.headers.common['Authorzation'];
   }
}

export default setAuthToken;