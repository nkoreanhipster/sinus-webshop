<template>
  <div id="banner" :style="getBannerSize">
    <span class="slogo" ref="slogo">{{ slogo }}</span>
    <ImageComponent :src="'skateboard-background-1.jpg'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ImageComponent from "@/components/ImageComponent.vue";
import randomizer from "@/lib/randomizer";
import { translate } from "@/lib/anime";
export default {
  data() {
    return {
      slogo: "",
    };
  },
  created() {},
  mounted() {
    let loop = () => {
      this.slogo = randomizer.getRandomSlogo();
      this.go(150);
      setTimeout(() => {
        loop();
      }, 6000);
    };
    loop();
  },
  computed: {
    ...mapGetters(["bannerSize"]),
    getBannerSize() {
      let { maxHeight, minHeight } = this.bannerSize;
      return { maxHeight: `${maxHeight}px`, minHeight: `${minHeight}px` };
    },
  },
  methods: {
    go(n) {
      translate(this.$refs.slogo, n);
    },
  },
  components: { ImageComponent },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
@import "@/styles/_animations.scss";

#banner {
  // background-image: url("~@");
  background-image: linear-gradient($gray-2, $gray-1, $gray-2);
  transition: 300ms ease-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100vw;
  overflow: hidden;
  //min-height: 20vh;
  // max-height: 453px;
}
.slogo {
  z-index: 3;
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  //transition: transform 2200ms, opacity 100ms ease, left 1000ms;
  top: 48%;
  white-space: nowrap;
  color: $blood-orange;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
}
// .fade-enter {
//   opacity: 0;
// }

// .fade-leave-to {
//   opacity: 0;
// }

// .fade-enter-active {
//   animation: fade-in 2.5s;
// }

// .fade-leave-active {
//   animation: fade-in 0.5s reverse;
// }

// @keyframes fade-in {
//   0% {
//     opacity: 0;
//     left: 0%;
//   }
//   50% {
//     opacity: 0.5;
//     transform: translate(-50%, -50%)
//   }
//   100% {
//     opacity: 1;
//     left: 100%;
//   }
// }
</style>