<template>
  <section
    :class="{ 'is-active': isModalActive }"
    class="modal"
    @click="closeModal"
  >
    <div class="bg-white m-6 p-6">
      <div>
      <h1>BAJSKORV</h1>
      <img src="~@/assets/bag.svg" style="background-color: black;"/>
      <!-- <img
        :src="require(`@/assets/${product.imgFile}`)"
        alt="/images/gallagher-not.found.png"
      /> -->

      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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