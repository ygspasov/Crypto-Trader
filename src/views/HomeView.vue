<template>
  <v-app id="inspire">
    <the-header></the-header>
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
