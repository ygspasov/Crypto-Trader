<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" v-bind="attrs" v-on="on"
            >Trade {{ itemName }}</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="secondary" dark>Trade {{ itemName }}</v-toolbar>
            <v-card-text>
              <v-container fluid>
                <v-row align="center">
                  <v-col cols="6">
                    <h3>Operation:</h3>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.operation}`"
                      :items="items"
                      item-text="operation"
                      label="Select"
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <h3>Choose account:</h3>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="selectAccount"
                      :hint="`${selectAccount.currency}`"
                      :items="itemsAccount"
                      item-text="currency"
                      label="selectAccount"
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
                <v-col cols="12"
                  ><v-row
                    ><v-text-field
                      label="Amount"
                      :counter="1"
                      hide-details="auto"
                      v-model="amount"
                      type="number"
                      required
                    ></v-text-field></v-row
                ></v-col>
                <v-col cols="12" class="mt-10">
                  <v-btn
                    depressed
                    @click="buyingCrypto"
                    :disabled="checkAmount"
                  >
                    {{ select.operation }} {{ itemName }}</v-btn
                  ></v-col
                >
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
          <div class="text-center">
            <v-snackbar v-model="snackbar" :timeout="4000">
              {{ accountMessage }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="black"
                  accountMessage
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { useCryptoStore } from '@/store/index';
export default {
  props: ['itemName', 'userId', 'currency', 'price'],
  data() {
    const store = useCryptoStore();
    return {
      store,
      select: { operation: 'Buy' },
      items: [{ operation: 'Buy' }, { operation: 'Sell' }],
      selectAccount: { currency: 'USD' },
      itemsAccount: [{ currency: 'USD' }, { currency: 'EUR' }],
      amount: 0,
      snackbar: false,
      accountMessage: ``,
    };
  },
  methods: {
    buyingCrypto() {
      const currency = this.selectAccount.currency;
      if (!this.store.singleTraderAccounts) {
        this.accountMessage = `You don't have an account. You should first open one.`;
        this.snackbar = true;
        return false;
      } else if (!this.store.singleTraderAccounts[currency]) {
        this.accountMessage = `No account in ${currency}. You should first open one.`;
        this.snackbar = !this.snackbar;
        return false;
      } else if (
        this.store.singleTraderAccounts[currency].amount <
        this.price * this.amount
      ) {
        this.accountMessage =
          "You don't have enough money. Consider a deposit.";
        this.snackbar = !this.snackbar;
        return false;
      } else {
        this.accountMessage = 'Purchase successful.';
        this.snackbar = !this.snackbar;
      }
      let oldBalance = this.store.singleTraderAccounts[currency].amount;
      this.store.tradeOperation(
        this.userId,
        currency,
        this.itemName,
        this.price,
        this.amount,
        oldBalance,
        this.select.operation
      );
      this.amount = 0;
    },
  },
  computed: {
    checkAmount() {
      return isNaN(this.amount) || this.amount <= 0 ? true : false;
    },
  },
  created() {
    this.store.loadSingleTraderAccounts(this.userId);
  },
};
</script>
