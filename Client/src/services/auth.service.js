import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class AuthService {
  async login(user) {
    return await axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  
  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      confirmPassword: user.confirmpassword,
      password: user.password
    });
  }

  async updateprofile(user) {
    return await axios
      .post(API_URL + 'updateprofile', user, {
        headers:{
          ...authHeader(),
        }
      })
      .then(response => {
        localStorage.setItem(
          'user', 
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('user')),
            ...response.data.user
          })
        );
        return response.data;
      });
  }
  async updateavatar(avatar) {
    return await axios
      .post(API_URL + 'updateavatar', avatar, {
        headers:{
          ...authHeader(),
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        localStorage.setItem(
          'user', 
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('user')),
            avatar: response.data.avatar
          })
        );
        return response.data;
      });
  }
}

export default new AuthService();