import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';
const API_URLs = 'http://localhost:4000/api/user';

//  Register the user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.reload();
  }

  return response.data;
};

//  login the user
const login = async (userData) => {
  const response = await axios.post(API_URLs, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.reload();
  }

  return response.data;
};

// logout user
const logout = async () => {
  localStorage.removeItem('user');
};
const Authservice = { register, logout, login };
export default Authservice;
