<template>
  <v-container fluid>
    <v-alert color="#2A3B4D" dark icon="mdi-firework" dense v-if="alertSignIn">
      {{ authMessage }}
    </v-alert>
    <v-alert
      color="#2A3B4D"
      dark
      icon="mdi-firework"
      dense
      v-if="alertSignedUp && this.store.signedUp"
    >
      {{ isSignedUpMessage }}
    </v-alert>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="grey darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="grey" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="grey" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{
                      'pink--text': sortBy === key,
                    }"
                  >
                    {{ keysRenamed[key] }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'pink--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="isAuthenticated">
                  <trade-popup
                    :itemName="item.name"
                    :userId="traderUid"
                    :currency="item.currency"
                    :price="item.price"
                  ></trade-popup
                ></v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="grey darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="grey darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { useCryptoStore } from '@/store/index';
import tradePopup from './popups/tradePopup.vue';
export default {
  components: { tradePopup },
  data() {
    const store = useCryptoStore();
    return {
      store,
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: true,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      //Renaming the original keys:
      keysRenamed: {
        currency: 'Currency',
        price: 'Price',
        'price date': 'Price date',
        'number of exchanges': 'Number of exchanges',
        'market cap': 'Market cap',
        'market cap dominance': 'Market cap dominance',
        high: 'High',
        'high time stamp': 'High time stamp',
      },
      keys: [
        'currency',
        'price',
        'price date',
        'number of exchanges',
        'market cap',
        'market cap dominance',
        'high',
        'high time stamp',
      ],
      items: store.crypto,
      alertSignIn: true,
      alertSignedUp: true,
    };
  },

  created() {
    this.crypto = this.store.loadCrypto();
    setTimeout(() => {
      this.alertSignIn = false;
    }, 4000);
    setTimeout(() => {
      this.alertSignedUp = false;
    }, 4000);
    this.store.loadSingleTraderPortfolio();
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    },
    isAuthenticated() {
      return this.store.isAuthenticated;
    },
    authMessage() {
      return this.store.isAuthenticated ? 'Signed in' : 'Not signed in';
    },
    isSignedUpMessage() {
      return this.store.signedUp
        ? 'Successfully signed up. A new user account has been created'
        : '';
    },
    traderUid() {
      return this.store.getTraderUid;
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
