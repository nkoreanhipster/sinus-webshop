<template>
  <div class="bg-white p-3 m-2">
    <div>
      <ProductMiniature
        v-for="item in cartItems"
        :key="item.obj._id"
        :product="item.obj"
        :duplicateCount="item.duplicateCount || 0"
      />
    </div>

    <hr />

    <div>
      <p>
        Total <span>{{ cartItemSum }}</span>
      </p>
    </div>

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
    ...mapGetters(["cart", "totalItemsInCart", "sumOfCartItems"]),
    /**
     * Filtered by joined duplicates
     */
    cartItems() {
      let cart = this.cart
      // Oh god.
      // Strangle me.
      cart.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
      var out = [];
      for (var j = 0; j < cart.length; j++) {
        const obj = cart[j];
        let found = out.find((x) => x.obj._id === obj._id);
        if (found)continue;
        let duplicateCount = cart.filter((x) => x._id === obj._id).length;
        out.push({ obj, duplicateCount });
      }
      return out
    },
    cartItemSum() {
      return this.sumOfCartItems;
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