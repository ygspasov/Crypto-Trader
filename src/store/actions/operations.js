import { getDatabase, ref, set, onValue } from 'firebase/database';
const db = getDatabase();
export default {
  //Trader operations
  //Adding new trader to the db (called on sign up action).
  createTrader(userId, name, email) {
    set(ref(db, 'traders/' + userId), {
      userId,
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
      console.log('db traders: ', data);
      //Setting store traders to database traders
      this.traders = data;
      console.log('store traders: ', this.traders);
    });
  },
  //Opening a new account
  openTraderAccount(userId, currency, amount) {
    set(ref(db, 'users/' + userId), {
      currency,
      amount,
    });
  },
};
