<template>
  <section
    :class="{ 'is-active': isModalActive }"
    class="modal"
    @click="closeModal"
  >
    <div class="bg-white p-3 modal-content-align">
      <span>
        <img class="image-medium" :src="product.imgFile" alt="image not found" />
      </span>
      <span class="m-2">
        <h1 class="m-1">{{ product.title }}</h1>
        <p class="m-1">
          <i>{{ product.shortDesc }}</i>
        </p>
        <p class="m-1">{{ product.longDesc }}</p>
        <h2 class="m-1">{{ product.price }} SEK</h2>
      </span>

      <div class="m-1">
        <button class="btn-black" @click="addToCart">Add to checkout</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    product: Object,
  },
  computed: {
    ...mapGetters(["modalStates"]),
    isModalActive() {
      return this.modalStates.cover;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("toggleModal", "cover");
    },
    addToCart() {
      this.$store.dispatch("addProductToCart", this.product);
    },
  },
};
</script>
<style scoped lang="scss">
.modal {
  display: grid;
  grid-template-columns: auto 40rem auto;
  grid-template-rows: auto 50rem auto;
}
.modal-content-align {
  grid-column: 2/2;
  grid-row: 2/2;
  justify-content: center;
}
</style>