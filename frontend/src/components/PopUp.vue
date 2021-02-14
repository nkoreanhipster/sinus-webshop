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
  watch: {
    "$store.state.isModalActive.login": {
      immediate: true,
      handler(x) {
        // todo; looks bad. do manually
        //test(this.$refs.popup, -150);
      },
    },
    "$store.state.isModalActive.cart": {
      immediate: true,
      handler(x) {
        // todo; looks bad. do manually
        //test(this.$refs.popup, -150);
      },
    },
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
  z-index: 2;
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

// @import "@/styles/_variables.scss";
// Make sure these are scoped
// aside {
//   position: absolute;
//   background-color: transparent;
//   padding-top: -1rem;
//   right: 0;
//   z-index: 2;
//   // Transparent spacing inbetween inner element
//   transform: translateX(-1.5rem);
//   visibility: hidden;
//   min-width: 3.5rem;
// }

// aside.is-active {
//   visibility: visible;
// }

// aside::before {
//   content: "";
//   width: 5.4rem;
//   height: 5.4rem;
//   position: absolute;
//   width: 0;
//   height: 0;
//   border-left: 1.6rem solid transparent;
//   border-right: 1.6rem solid transparent;
//   border-bottom: 1.6rem solid white;
//   left: calc(50% + 5.4rem);
//   top: -1rem;
//   z-index: 2;
// }

// aside > div {
//   position: sticky;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 62px;
//   text-align: right;
// }
</style>