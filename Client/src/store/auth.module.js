import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    updateprofile({ commit }, user) {
      return AuthService.updateprofile(user).then(
        response => {
          commit('updateSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updateavatar({ commit }, avatar) {
      return AuthService.updateavatar(avatar).then(
        response => {
          commit('updateAvatarSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateSuccess(state, response) {
      state.status.loggedIn = true;
      state.user = response.user;
    },
    updateAvatarSuccess(state, response) {
      state.status.loggedIn = true;
      state.user.avatar = response.avatar;
    },
  }
};