<template>
  <section
    :class="{ 'is-active': isModalActive }"
    class="modal"
    @click="closeModal"
  >
    <div class="bg-white m-6 p-6">
      Details and buy-button about product here
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