<template>
  <section class="products">
    <ProductBox
      v-for="item in allProducts"
      :key="item.id"
      :product="item"
    ></ProductBox>
  </section>
</template>

<script>
import ProductBox from "@/components/ProductBox.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["productCatalog"]),
    allProducts() {
      return this.productCatalog;
    },
  },
  methods: {
    async loadProductCatalog() {
      let response = await this.$store.dispatch("loadProductsFromDB");
    },
  },
  mounted() {
    this.loadProductCatalog();
  },
  components: { ProductBox },
};
</script>
<style lang="scss">
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
}
</style>