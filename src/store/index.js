import { defineStore } from 'pinia';
import actions from './actions.js';

export const useCriptoStore = defineStore('cryptoStore', {
  state: () => ({
    crypto: [],
    users: [],
  }),
  getters: {},
  actions,
});
