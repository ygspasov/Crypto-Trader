import { defineStore } from 'pinia';
import actions from './actions.js';

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    accessToken: '',
    signedUp: false,
    traderName: '',
    traderEmail: '',
    crypto: [],
    traders: [],
  }),
  getters: {
    isAuthenticated: state => state.accessToken,
    isSignedUp: state => state.signedUp,
    getTraders: state => state.traders,
    getTraderName(state) {
      let traders = state.traders;
      for (const trader in traders) {
        if (traders[trader].email === this.traderEmail) {
          return traders[trader].name;
        }
      }
    },
    getTraderEmail: state => state.traderEmail,
  },
  actions,
});
