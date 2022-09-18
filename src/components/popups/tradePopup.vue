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
      rules: [
        value => !!value || 'Required.',
        value => (value && value >= 0.1) || 'Min 0.1',
      ],
      amount: 0,
    };
  },
  methods: {
    buyingCrypto() {
      let oldBalance = this.store.singleTraderAccounts.USD.amount;
      console.log('oldBalance ', oldBalance);
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
  },
  created() {
    this.store.loadSingleTraderAccounts(this.userId);
  },
};
</script>
