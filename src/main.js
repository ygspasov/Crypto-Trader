import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { createPinia, PiniaVuePlugin } from 'pinia';
import './store/index.js';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

const app = new Vue({
  router,
  vuetify,
  render: h => h(App),
  pinia,
});

app.$mount('#app');
