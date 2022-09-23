<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-simple-table v-if="accounts">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Currency</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.name">
              <td>{{ account.currency }}</td>
              <td>
                {{ accountValue(account.amount) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <v-row class="d-flex justify-center mt-10"><h3>Deposit money:</h3></v-row>
    <v-row class="d-flex justify-center">
      <v-form ref="form" v-model="valid" lazy-validation @submit="depositMoney">
        <v-text-field
          v-model="number"
          :counter="10"
          :rules="numberRules"
          label="Amount"
          type="number"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="currencyRules"
          label="Currency"
          required
        ></v-select>

        <v-btn
          :disabled="!valid || !number"
          depressed
          class="mr-4"
          @click="depositMoney"
        >
          Deposit money
        </v-btn>
      </v-form>
    </v-row>
    <v-row class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="4000" top
        ><span class="mr-2">{{ accountMessage }}</span>
        <v-btn color="black" @click="snackbar = !snackbar"
          >Close</v-btn
        ></v-snackbar
      >
    </v-row>
  </v-container>
</template>
<script>
import { useCryptoStore } from '@/store/index';
export default {
  data() {
    const store = useCryptoStore();
    return {
      store,
      valid: true,
      number: null,
      numberRules: [
        v => !!v || 'Number is required',
        v =>
          (v && v.length >= 3 && v.length <= 10 && v >= 100) ||
          'The number must be between 3 and 10 characters and at least 100 USD/EUR.',
      ],
      currencyRules: [v => !!v || 'Item is required'],
      select: null,

      items: ['USD', 'EUR'],

      accountMessage: '',
      snackbar: false,
    };
  },
  methods: {
    depositMoney() {
      this.accountMessage = '';
      let checkAccounts = true;
      const userId = this.traderUid;
      const currency = this.select;
      const amount = Number(this.number);
      let update = 0; //deposit + balance
      const accounts = this.store.singleTraderAccounts;
      accounts.forEach(element => {
        //Checks for the existence of accounts and displays messages. Prevents a deposit if no accounts exist.

        if (accounts.length === 0 || !element.currency) {
          console.log('accounts ', accounts);
          this.accountMessage = `No account in ${currency}. You should first open one.`;
          this.snackbar = true;
          checkAccounts = false;
        } else {
          console.log('element.currency ', element.currency);
          console.log('element.amount ', element.amount);
          console.log('amount ', amount);
          update = Number(element.amount) + amount;
          console.log('update ', update);
        }
      });
      if (!checkAccounts) return;
      this.displayCreditInfo(currency, amount);
      this.reset();
      this.store.openTraderAccount(userId, currency, update);
      console.log('opening');
      this.store.loadSingleTraderAccounts(this.traderUid);
    },
    //Displays messages after an account has been credited.
    displayCreditInfo(currency, amount) {
      const accounts = this.store.singleTraderAccounts;
      if (accounts && currency === 'EUR') {
        this.accountMessage = `You EUR account has been credited with EUR ${amount}.`;
        this.snackbar = true;
      } else if (accounts && currency === 'USD') {
        this.accountMessage = `You USD account has been credited with USD ${amount}.`;
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    accountValue(v) {
      return v !== undefined
        ? v.toLocaleString('en-EN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : '';
    },
  },
  computed: {
    traderUid() {
      return this.store.getTraderUid;
    },
    accounts() {
      return this.store.singleTraderAccounts;
    },
  },
  created() {
    this.store.loadSingleTraderAccounts(this.traderUid);
  },
};
</script>
<style scoped>
.v-form {
  min-width: 400px;
  min-height: 400px;
}
.v-data-table {
  min-width: 400px;
}
</style>
