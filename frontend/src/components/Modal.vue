<template>
  <section
    :class="{ 'is-active': isModalActive }"
    class="modal"
    @click="closeModal"
  >
    <div class="bg-white p-3 modal-content-align">
      <span style="margin-right: 5rem;">
        <img src="/images/gallagher-not.found.png" alt="" />
      </span>
      <span>
        <h1>{{ product.title }}</h1>
        <p>{{ product.shortDesc }}</p>
        <p>{{ product.longDesc }}</p>
        <h2>{{ product.price }} SEK</h2>
      </span>
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
  },
};
</script>
<style scoped lang="scss">
.modal-content-align {
  display: grid;
  width: 100%;
  //grid-auto-columns: minmax(20rem, auto);
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
}
</style>