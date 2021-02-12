<template>
  <section class="products">
    <ProductItem
      v-for="item in allProducts"
      :key="item.id"
      :product="item"
    ></ProductItem>
<<<<<<< HEAD
    
=======
    <Modal :product="selectedItem"></Modal>
>>>>>>> 9fba93ba8edd308c3dfc0784c032cb129c1a9a3e
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";

export default {
  data(){
    return{
      //The chosen product
      selectedItem: {} 
    }
  },

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
    this.$on ("selectedProduct", function(data){
      this.selectedItem = data
    })
  },
  components: { ProductItem, Modal },
};
</script>
