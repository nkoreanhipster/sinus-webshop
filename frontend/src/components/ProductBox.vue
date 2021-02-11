<template>
  <article class="mv-4 p-1">
    <ProductItem :product="product" />
    <div class="product-box">
      <input type="number" v-model.number="amountToAddToCart" />
      <button @click="addToCart" class="pv-1 ph-6">+</button>
    </div>
  </article>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
export default {
  data() {
    return {
      // Number input, hur många X antal produkter man vill läggga i cart
      amountToAddToCart: 1,
    };
  },
  props: {
    // ProductObject från parent
    product: Object,
  },
  methods: {
    addToCart() {
      let arr = new Array(this.amountToAddToCart).fill(this.product);
      this.$store.dispatch("addProductsToCart", arr);
    },
  },
  components: { ProductItem },
};
</script>