<template>
  <div id="app" class="is-fullsize">
    <Navigation></Navigation>
    <main class="">
      <router-view />
    </main>
    <Modal></Modal>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Navigation,
    Modal,
  },
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
