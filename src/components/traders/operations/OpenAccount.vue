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
              <td>{{ accountValue(account.amount) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <v-row class="d-flex justify-center mt-10" v-if="!accounts"
      ><h3>Open an account:</h3></v-row
    >
    <v-row class="d-flex justify-center">
      <v-form ref="form" v-model="valid" lazy-validation @submit="openAccount">
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

        <v-checkbox
          v-model="checkbox"
          :rules="selectRules"
          label="Do you agree to open an account?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid || !number"
          depressed
          class="mr-4"
          @click="openAccount"
        >
          Open account
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
          (v && v.length >= 3 && v.length <= 10) ||
          'The number must be between 3 and 10 characters',
      ],
      currencyRules: [v => !!v || 'Item is required'],
      select: null,
      selectRules: [v => !!v || 'You must agree to continue!'],
      items: ['USD', 'EUR'],
      checkbox: false,
      accountMessage: '',
      snackbar: false,
    };
  },
  methods: {
    openAccount() {
      this.accountMessage = '';
      const userId = this.traderUid;
      const currency = this.select;
      const amount = this.number;
      this.hasAccountInCurrency(currency);
      this.reset();
      if (this.accountMessage) return;
      this.store.openTraderAccount(userId, currency, amount);
      this.accountMessage = `A new account in ${currency} has been created.`;
      this.snackbar = true;
    },
    hasAccountInCurrency(currency) {
      const accounts = this.store.singleTraderAccounts;
      if (accounts && accounts.EUR && currency === 'EUR') {
        this.accountMessage = 'You already have an account in EUR.';
        this.snackbar = true;
      } else if (accounts && accounts.USD && currency === 'USD') {
        this.accountMessage = 'You already have an account in USD.';
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
