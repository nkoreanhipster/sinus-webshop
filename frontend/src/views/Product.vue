<template>
  <section class="wrapper">
    <!-- <p class="m-4" style="font-size: 1.2rem">
      <span v-for="item in product" :key="item._id">{{ item }}<br /></span>
    </p> -->
    <ProductMiniature
      :product="product"
      :duplicateCount=1
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ProductMiniature from "@/components/ProductMiniature.vue"
export default {
  components: {ProductMiniature},
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
      let id = window.location.pathname.split("/").pop();
      let response = await this.$store.dispatch("loadSingleProductbyId", id);
      this.product = response;
    },
  },
};
</script>
