<template>
  <div><h3>The portfolio</h3></div>
</template>
<script>
import { useCryptoStore } from '@/store/index';
export default {
  data() {
    const store = useCryptoStore();
    return {
      traderUid: '',
      portfolio: [],
      store,
    };
  },
  created() {
    this.traderUid = this.store.traderUid;
    this.store.loadSingleTraderPortfolio();
  },
};
</script>
<style></style>
