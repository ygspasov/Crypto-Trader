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
    this.singleTraderAccounts = [];
    const accounts = ref(db, 'traders/' + userId + '/accounts/');
    onValue(accounts, snapshot => {
      const traderAccounts = snapshot.val();
<<<<<<< HEAD
      if (traderAccounts && traderAccounts.EUR)
        this.singleTraderAccounts.push(traderAccounts.EUR);
      if (traderAccounts && traderAccounts.USD)
<<<<<<< HEAD
        console.log('traderAccounts ', traderAccounts);
      if (traderAccounts.EUR)
        this.singleTraderAccounts.push(traderAccounts.EUR);
      if (traderAccounts.USD)
=======
=======
      console.log('traderAccounts ', traderAccounts);
      if (traderAccounts.EUR)
        this.singleTraderAccounts.push(traderAccounts.EUR);
      if (traderAccounts.USD)
>>>>>>> ab0fe46e373b0fbd4fef11cdfb89ea13624583e6
>>>>>>> a7123f9fac73ce49cc17edc70944fda62b94bf9f
        this.singleTraderAccounts.push(traderAccounts.USD);
      // this.singleTraderAccounts = traderAccounts;
    });
    console.log('singleTraderAccounts ', this.singleTraderAccounts);
  },
  //Load trader purchases
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
          opId: traderPurchases[key].opId,
        });
      }
    });
  },
  //Load
  loadSingleTraderPurchases(userId) {
    const singleTraderPurchases = ref(
      db,
      'traders/' + userId + '/accounts/transactions/'
    );
    onValue(singleTraderPurchases, snapshot => {
      const traderPurchases = snapshot.val();
      this.singleTraderPurchases = traderPurchases;
      console.log('singleTraderPurchases: ', this.singleTraderPurchases);
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
<<<<<<< HEAD
    const accountUpdate = { cryptoName, amount, opType, dateOfOperation };
=======
>>>>>>> 817aa5479d8059f7f58d0d8fcd24a8066dec378d
    const accountUpdate = {
      cryptoName,
      amount,
      opType,
      dateOfOperation,
      paidForIn: currency,
      priceOnTrade: price,
<<<<<<< HEAD
=======
      opId,
>>>>>>> 817aa5479d8059f7f58d0d8fcd24a8066dec378d
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
      console.log('traderPortfolio ', traderPortfolio);
      // for (const key in traderPortfolio) {
      //   this.singleTraderPortfolio.unshift({
      //     cryptoName: traderPurchases[key].cryptoName,
      //   });
    });
  },
};
