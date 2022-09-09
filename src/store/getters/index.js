export default {
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
};
