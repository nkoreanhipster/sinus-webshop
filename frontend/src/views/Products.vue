<template>
  <section class="products">
    <ProductItem
      v-for="item in allProducts"
      :key="item.id"
      :product="item"
    ></ProductItem>
    <Modal></Modal>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";

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
  components: { ProductItem, Modal },
};
</script>
<style lang="scss">
.products {
  display: grid;
  width: 100%;
  //grid-auto-columns: minmax(20rem, auto);
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}
</style>