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
                      :rules="rules"
                      hide-details="auto"
                      v-model="amount"
                    ></v-text-field></v-row
                ></v-col>
                <v-col cols="12" class="mt-10">
                  <v-btn depressed @click="buyingCrypto"> Trade </v-btn></v-col
                >
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
          <div class="text-center">
            <!-- <v-btn dark @click="snackbar = true"> Open Snackbar </v-btn> -->
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
      select: { operation: 'Buying' },
      items: [{ operation: 'Buying' }, { operation: 'Selling' }],
      selectAccount: { currency: 'USD' },
      itemsAccount: [{ currency: 'USD' }, { currency: 'EUR' }],
      rules: [
        value => !!value || 'Required.',
        value => (value && value >= 0.1) || 'Min 0.1',
      ],
      amount: 0,
      snackbar: false,
      accountMessage: ``,
    };
  },
  methods: {
    buyingCrypto() {
      this.accountCheck();
      let oldBalance = this.store.singleTraderAccounts.USD.amount;
      this.store.tradeOperation(
        this.userId,
        this.currency,
        this.itemName,
        this.price,
        this.amount,
        oldBalance,
        this.select.operation
      );
    },
    accountCheck() {
      if (!this.store.singleTraderAccounts) {
        this.accountMessage = `You don't have an account. You should first open one.`;
        this.snackbar = true;
        return;
      } else if (!this.store.singleTraderAccounts.USD) {
        this.accountMessage = 'No account in USD. You should first open one.';
        this.snackbar = !this.snackbar;
        return;
      } else if (
        this.store.singleTraderAccounts.USD.amount <
        this.price * this.amount
      ) {
        this.accountMessage =
          "You don't have enough money. Consider a deposit.";
        this.snackbar = !this.snackbar;
        return;
      } else {
        this.accountMessage = 'Purchase successful.';
        this.snackbar = !this.snackbar;
      }
    },
  },
  created() {
    this.store.loadSingleTraderAccounts(this.userId);
  },
};
</script>
