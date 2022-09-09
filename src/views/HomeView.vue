<template>
  <v-app id="inspire">
    <the-header></the-header>
    <h1 class="d-flex justify-center mb-6, font-weight-light">
      Buy and sell crypto assets in just a few clicks.
    </h1>
    <p class="d-flex justify-center mb-6, font-weight-light">
      Our high-liquidity exchange makes sure that your trade orders are executed
      quickly and at the price you want.
    </p>
    <the-lists></the-lists>
  </v-app>
</template>

<script>
import TheLists from '../components/TheLists.vue';
import TheHeader from '../components/header/TheHeader.vue';
export default {
  components: {
    TheLists,
    TheHeader,
  },
};
</script>
