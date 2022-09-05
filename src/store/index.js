import { defineStore } from 'pinia';
import actions from './actions.js';

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    accessToken: '',
    crypto: [],
    users: [],
  }),
  getters: {
    isAuthenticated: state => state.accessToken,
  },
  actions,
});
