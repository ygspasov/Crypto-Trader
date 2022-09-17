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
                      label="Quantity"
                      :rules="rules"
                      hide-details="auto"
                      v-model="quantity"
                    ></v-text-field></v-row
                ></v-col>
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
export default {
  props: ['itemName', 'userId', 'currency', 'price'],
  data() {
    return {
      select: { operation: 'Buying' },
      items: [{ operation: 'Buying' }, { operation: 'Selling' }],
      rules: [
        value => !!value || 'Required.',
        value => (value && value >= 0.1) || 'Min 0.1',
      ],
      quantity: 0,
    };
  },
  methods: {
    buyingCrypto(cryptoName, price) {
      const opType = 'purchase';
      const amount = 300;
      this.store.tradeOperation(
        this.userId,
        this.currency,
        cryptoName,
        price,
        amount,
        opType
      );
    },
  },
};
</script>
