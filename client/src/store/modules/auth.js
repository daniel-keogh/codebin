import axios from 'axios';
import jwt from 'jwt-decode';

export default {
  state: () => ({
    token: '',
    username: '',
    isAuthorized: false,
  }),

  mutations: {
    authUser(state, payload) {
      state.token = payload.token;
      state.isAuthorized = payload.isAuthorized;
      state.username = payload.username;
    },

    clearAuthData(state) {
      state.token = '';
      state.isAuthorized = false;
      state.username = '';
    },
  },

  actions: {
    init({ dispatch }) {
      dispatch('autoLogin');
    },

    async register({ commit, dispatch }, payload) {
      const { username, password } = payload;

      try {
        const res = await axios.post('/auth/register', {
          username,
          password,
        });

        const token = res.data.accessToken;

        commit('authUser', {
          token,
          isAuthorized: true,
          username,
        });

        dispatch('startLogoutTimer', jwt(token).exp);

        localStorage.setItem('token', token);
      } catch (err) {
        if (err.response) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error('Unable to register. Try again later');
        }
      }
    },

    async login({ commit, dispatch }, payload) {
      const { username, password } = payload;

      try {
        const res = await axios.post('/auth/login', {
          username,
          password,
        });

        const token = res.data.accessToken;

        commit('authUser', {
          token,
          isAuthorized: true,
          username,
        });

        dispatch('startLogoutTimer', jwt(token).exp);

        localStorage.setItem('token', token);
      } catch (err) {
        if (err.response) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error('Unable to login. Try again later');
        }
      }
    },

    autoLogin({ commit, dispatch }) {
      const token = localStorage.getItem('token');

      if (token) {
        const { username, exp } = jwt(token);

        if (new Date() >= new Date(exp * 1000)) {
          // Token expired
          localStorage.removeItem('token');
          return;
        }

        commit('authUser', {
          token,
          isAuthorized: true,
          username,
        });

        dispatch('startLogoutTimer', exp);
      }
    },

    logout({ commit }) {
      localStorage.removeItem('token');
      commit('clearAuthData');
    },

    startLogoutTimer({ dispatch }, time) {
      const exp = new Date(time * 1000) - new Date();
      setTimeout(() => dispatch('logout'), exp);
    },
  },
};
