import { getDatabase, ref, set, onValue, update } from 'firebase/database';
const db = getDatabase();
export default {
  //Trader operations
  //Adding new trader to the db (called on sign up action).
  createTrader(userId, name, email) {
    set(ref(db, 'traders/' + userId), {
      name,
      email,
      admin: false,
      premium: false,
    });
  },
  //Fetching all the active traders from the db
  loadTraders() {
    const traderData = ref(db, 'traders/');
    onValue(traderData, snapshot => {
      const data = snapshot.val();
      this.traders = data;
    });
  },
  //Opening a new account
  openTraderAccount(userId, currency, amount) {
    const updates = {};
    if (currency === 'USD') {
      updates['/traders/' + userId + '/accounts/' + currency] = amount;
    } else if (currency === 'EUR') {
      updates['/traders/' + userId + '/accounts/' + currency] = amount;
    }
    return update(ref(db), updates);
  },
  //Load all the accounts for a trader
  loadSingleTraderAccounts(userId) {
    const accounts = ref(db, 'traders/' + userId + '/accounts/');
    onValue(accounts, snapshot => {
      const traderAccounts = snapshot.val();
      this.singleTraderAccounts = traderAccounts;
    });
  },
};
