<template>
  <div id="app" class="is-fullsize">
    <Navigation :class="{'is-blurred':isModalFullCoverActive}"></Navigation>
    <main class="" :class="{'is-blurred':isModalFullCoverActive}">
      <router-view />
    </main>
    <Modal></Modal>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Modal from "@/components/Modal.vue";
import {mapGetters} from 'vuex';
export default {
  components: {
    Navigation,
    Modal,
  },
  computed: {
    ...mapGetters(["modalStates"]),
    isModalFullCoverActive() {
      return this.modalStates.cover;
    },
  },
};
</script>

<style lang="scss" >
@import "~@/styles/_global.scss";
</style>
