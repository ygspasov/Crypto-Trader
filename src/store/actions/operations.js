import { getDatabase, ref, set, onValue, update } from 'firebase/database';
const db = getDatabase();
import uniqid from 'uniqid';
import moment from 'moment';

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
    amount = Number(amount);
    const openedOn = moment().format('MMMM Do YYYY, h:mm:ss a');
    const updates = {};
    const accountUpdate = { currency, amount, openedOn };
    updates['/traders/' + userId + '/accounts/' + currency] = accountUpdate;
    return update(ref(db), updates);
  },
  //Load all the accounts for a trader
  loadSingleTraderAccounts(userId) {
    const accounts = ref(db, 'traders/' + userId + '/accounts/');
    onValue(accounts, snapshot => {
      const traderAccounts = snapshot.val();
      let update = {};
      if (traderAccounts && traderAccounts.EUR) update.EUR = traderAccounts.EUR;
      if (traderAccounts && traderAccounts.USD) update.USD = traderAccounts.USD;
      this.singleTraderAccounts = update;
    });
  },
  //Load
  loadSingleTraderPurchases(userId) {
    const singleTraderPurchases = ref(
      db,
      'traders/' + userId + '/accounts/transactions/'
    );
    onValue(singleTraderPurchases, snapshot => {
      this.singleTraderPurchases = [];
      const traderPurchases = snapshot.val();
      for (const key in traderPurchases) {
        this.singleTraderPurchases.unshift({
          cryptoName: traderPurchases[key].cryptoName,
          amount: traderPurchases[key].amount,
          opType: traderPurchases[key].opType,
          dateOfOperation: traderPurchases[key].dateOfOperation,
          paidForIn: traderPurchases[key].paidForIn,
          priceOnTrade: traderPurchases[key].priceOnTrade,
          totalPrice: Number(traderPurchases[key].totalPrice).toFixed(2),
          opId: traderPurchases[key].opId,
        });
      }
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
    const dateOfOperation = moment().format('MMMM Do YYYY, h:mm:ss a');
    const updates = {};
    const accountUpdate = {
      cryptoName,
      amount,
      opType,
      dateOfOperation,
      paidForIn: currency,
      priceOnTrade: price,
      totalPrice: price * amount,
      opId,
    };
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
    this.updateCryptoPortfolio(userId, cryptoName, amount, opType);
    return update(ref(db), updates);
  },
  //Debit ot credit a trader account
  updateTraderAccount(userId, currency, amount, price, oldBalance, opType) {
    const updates = {};
    console.log(
      'updateTraderAccount:',
      userId,
      currency,
      amount,
      price,
      oldBalance,
      opType
    );
    //Exchanging the EUR into USD
    if (currency === 'EUR') amount = amount * 0.998578;
    //Recalculating the trader balance in accordance with the type of operation.
    let newBalance;
    if (opType === 'Buy') {
      newBalance = +oldBalance - amount * price;
      const accountUpdate = { currency, amount: newBalance };
      updates['/traders/' + userId + '/accounts/' + currency] = accountUpdate;
    } else if (opType === 'Sell') {
      newBalance = +oldBalance + amount * price;
      const accountUpdate = { currency, amount: newBalance };
      updates['/traders/' + userId + '/accounts/' + currency] = accountUpdate;
    }

    return update(ref(db), updates);
  },
  //Create and update a crypto portfolio
  updateCryptoPortfolio(userId, cryptoName, amount, opType) {
    let oldBalance = ref(
      db,
      '/traders/' + userId + '/accounts/portfolio/' + cryptoName + '/amount'
    );
    let traderBalance = 0;
    onValue(oldBalance, snapshot => {
      traderBalance = snapshot.val() || 0;
    });
    amount = Number(amount);
    opType === 'Buy'
      ? (amount += traderBalance)
      : (amount = traderBalance - amount);

    const lastUpdate = moment().format('MMMM Do YYYY, h:mm:ss a');
    const updates = {};
    const accountUpdate = {
      cryptoName,
      lastUpdate,
      amount,
    };
    updates['/traders/' + userId + '/accounts/portfolio/' + cryptoName] =
      accountUpdate;
    return update(ref(db), updates);
  },
  //Load single trader portfolio
  loadSingleTraderPortfolio() {
    const userId = this.traderUid;
    console.log('userId ', userId);
    const singleTraderPurchases = ref(
      db,
      '/traders/' + userId + '/accounts/portfolio/'
    );
    onValue(singleTraderPurchases, snapshot => {
      this.singleTraderPortfolio = [];
      const traderPortfolio = snapshot.val();
      const portfolio = [];
      for (const key in traderPortfolio) {
        portfolio.push({
          cryptoName: traderPortfolio[key].cryptoName,
          amount: traderPortfolio[key].amount,
        });
      }
      //Summing amounts of the same crypto (aggregating values)
      const result = Object.values(
        portfolio.reduce((acc, item) => {
          acc[item.cryptoName] = acc[item.cryptoName]
            ? { ...item, amount: item.amount + acc[item.cryptoName].amount }
            : item;
          return acc;
        }, {})
      );
      this.singleTraderPortfolio = result;
      console.log('singleTraderPortfolio: ', this.singleTraderPortfolio);
    });
  },
};
