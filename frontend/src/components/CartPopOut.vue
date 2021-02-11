<template>
  <div class="bg-white p-3">
    <div>
      <ProductMiniature
        v-for="item in cartItems"
        :key="item.id"
        :product="item"
      />
    </div>

    <hr />

    <button
      class="btn-black mt-3"
      :disabled="isButtonDisabled"
      @click="takeMeToCheckOut"
    >
      Take my money!
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductMiniature from "@/components/ProductMiniature.vue";
export default {
  computed: {
    ...mapGetters(["cart", "totalItemsInCart"]),
    cartItems() {
      return this.cart;
    },
    isButtonDisabled() {
      return this.totalItemsInCart < 1 ? true : false;
    },
  },
  methods: {
    takeMeToCheckOut() {
      // No items, no buttonz nor redirexct
      if (this.isButtonDisabled) return;
      this.$router.push({ path: "/checkout" });
    },
  },
  components: { ProductMiniature },
};
</script>


<style lang="postcss" scoped>
div > div {
  max-height: 30vw;
  overflow-y: scroll;
}
</style>