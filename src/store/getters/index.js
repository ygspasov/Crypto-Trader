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
  getTraderUid: state => state.traderUid,
  getSingleTraderAccounts: state => state.getSingleTraderAccounts,
  getHasAccount: state => state.singleTraderAccounts.length > 0,
  getSingleTraderUSDAccount: state =>
    state.singleTraderAccounts.USD || 'No account in USD',
  getSingleTraderEURAccount: state =>
    state.singleTraderAccounts.EUR || 'No account in EUR',
  getSingleTraderUSDBallance: state => state.singleTraderAccounts.USD.amount,
  getSingleTraderEURBallance: state => state.singleTraderAccounts.EUR.amount,
};
