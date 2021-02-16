<template>
  <section class="wrapper">
    <p class="m-4">
      Product info from url. Not enough time to implement not looking like crap ¯\_(ツ)_/¯
    </p>
    <p class="m-4" style="font-size:1.2rem;">
        <span v-for="item in product" :key="item._id">{{item}}<br></span>
    </p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: Object,
    };
  },
  mounted() {
    this.loadSingleProduct();
  },
  methods: {
    async loadSingleProduct() {
  
      let id = window.location.pathname.split('/').pop()
      let response = await this.$store.dispatch("loadSingleProductbyId", id);
      this.product = response;
    },
  },
};
</script>
