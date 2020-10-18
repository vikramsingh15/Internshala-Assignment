import axios from 'axios';
//set jwt token to header

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['jwtToken'] = token;
  } else {
    delete axios.defaults.headers.common['jwtToken'];
  }
};

export default setAuthToken;
