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
    const postData = {
      currency,
      amount,
    };
    const updates = {};
    updates['/traders/' + userId + '/accounts/'] = postData;
    return update(ref(db), updates);
  },
};
