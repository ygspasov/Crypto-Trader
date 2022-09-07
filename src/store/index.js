import { defineStore } from 'pinia';
import actions from './actions.js';

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    accessToken: '',
    traderName: '',
    traderEmail: '',
    crypto: [],
    traders: [],
  }),
  getters: {
    isAuthenticated: state => state.accessToken,
    getTraders: state => state.traders,
    getTraderName: state => state.traderName,
    getTraderEmail: state => state.traderEmail,
  },
  actions,
});
