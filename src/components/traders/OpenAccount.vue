<template>
  <v-container>
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
          color="success"
          class="mr-4"
          @click="openAccount"
        >
          Open account
        </v-btn>
      </v-form>
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
    };
  },

  methods: {
    openAccount() {
      const userId = this.traderUid;

      const currency = this.select;
      const amount = this.number;
      console.log(
        'userId ' + userId,
        'currency ' + currency,
        'amount ' + amount
      );
      this.store.openTraderAccount(userId, currency, amount);
      console.log('opening account');
    },
  },
  computed: {
    traderUid() {
      return this.store.getTraderUid;
    },
  },
};
</script>
<style scoped>
.v-form {
  min-width: 400px;
  min-height: 400px;
}
</style>
