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
              <div class="text-h2 pa-12">Buy/Sell/Trade</div>
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
  props: ['itemName'],
  data() {
    return {};
  },
};
</script>
