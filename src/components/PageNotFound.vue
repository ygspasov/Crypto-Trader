<template>
  <v-container fluid>
    <the-header></the-header>
    <v-row
      ><h1 class="mt-5 font-weight-light">Sorry, this page does not exist!</h1>
    </v-row>
    <v-row
      ><v-btn depressed :to="{ name: 'home' }" class="mt-5">
        Back to home</v-btn
      ></v-row
    ></v-container
  >
</template>
<script>
import TheHeader from '../components/header/TheHeader.vue';
export default {
  components: { TheHeader },
};
</script>
<style scoped>
h1,
a {
  text-align: center;
  margin: 0 auto;
}
</style>
