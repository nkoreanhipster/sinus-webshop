<template>
  <section>
    <div class="products is-blurrable">
      <ProductItem
        v-for="item in allProducts"
        :key="item.id"
        :product="item"
      ></ProductItem>
      <img
        src="@/assets/cool_skate_dude.jpg"
        style="grid-row: 2; grid-column: 2 / 3"
        alt=""
        class="mb-4 mt-2"
      />
    </div>
    <Modal :product="selectedItem"></Modal>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";

export default {
  metaInfo: {
    title: "PRODUCTS",
  },
  data() {
    return {
      //The chosen product
      selectedItem: {},
    };
  },

  computed: {
    ...mapGetters(["productCatalog", "modalStates"]),
    isModalFullCoverActive() {
      return this.modalStates.cover;
    },
    allProducts() {
      return this.productCatalog;
    },
  },
  methods: {
    async loadProductCatalog() {
      let response = await this.$store.dispatch("loadProductsFromDB");
    },
  },
  created() {
    this.$store.dispatch("resetInterface");
    this.$store.dispatch("closeAllModals");
  },
  mounted() {
    this.loadProductCatalog();
    this.$on("selectedProduct", function (data) {
      this.selectedItem = data;
    });
  },
  components: { ProductItem, Modal },
};
</script>
