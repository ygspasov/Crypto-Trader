import { getDatabase, ref, set, onValue, update } from 'firebase/database';
const db = getDatabase();
import uniqid from 'uniqid';
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
  //Open a new account or update an existing one
  openTraderAccount(userId, currency, amount) {
    const updates = {};
    const accountUpdate = { currency: currency, amount: amount };
    updates['/traders/' + userId + '/accounts/' + currency] = accountUpdate;
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
  //Conducting varios trade operations
  tradeOperation(
    userId,
    currency,
    cryptoName,
    price,
    amount,
    oldBalance,
    opType
  ) {
    const opId = uniqid();
    const updates = {};
    const accountUpdate = { cryptoName, amount };
    updates['/traders/' + userId + '/accounts/transactions/' + opId] =
      accountUpdate;
    this.updateTraderAccount(
      userId,
      currency,
      amount,
      price,
      oldBalance,
      opType
    );
    console.log(opType);
    return update(ref(db), updates);
  },
  //Debit ot credit a trader account
  updateTraderAccount(userId, currency, amount, price, oldBalance, opType) {
    const updates = {};
    console.log(userId, currency, amount, price, oldBalance, opType);
    const newBalance = +oldBalance - amount * price;
    if (opType === 'Buying') {
      const accountUpdate = { currency, amount: newBalance };
      updates['/traders/' + userId + '/accounts/' + currency] = accountUpdate;
    }

    return update(ref(db), updates);
  },
};
