import { defineStore } from 'pinia';
import actions from './actions/index.js';
import getters from './getters/index.js';

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    accessToken: '',
    signedUp: false,
    traderName: '',
    traderEmail: '',
    traderUid: '',
    crypto: [],
    traders: [],
    singleTraderAccounts: [],
    singleTraderPurchases: [],
    singleTraderPortfolio: [],
  }),
  getters,
  actions,
});
