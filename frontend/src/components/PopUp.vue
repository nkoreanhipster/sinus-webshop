<template>
  <aside :class="{ 'is-active': isActive }" ref="popup">
    <slot name="login"></slot>
    <slot name="cart"></slot>
  </aside>
</template>

<script>
import { translate, hide, test } from "@/lib/anime";
import { mapGetters } from "vuex";
export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      states: {},
    };
  },
  computed: {
    ...mapGetters(["modalStates"]),
    activeModals() {
      return this.$store.state.isModalActive;
    },
    getModalStates() {
      return this.modalStates;
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  min-width: 32rem;
  position: absolute;
  visibility: hidden;
  display: none;
  transition: 0.5s ease;
  right: 0;
  z-index: 4;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 62px;
}
aside.is-active {
  display: block;
  visibility: visible;
}
aside::before {
  content: "";
  width: 5.4rem;
  height: 5.4rem;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 1.6rem solid transparent;
  border-right: 1.6rem solid transparent;
  border-bottom: 1.6rem solid white;
  left: calc(50% + 3.4rem);
  top: -1rem;
  z-index: 2;
}
</style>