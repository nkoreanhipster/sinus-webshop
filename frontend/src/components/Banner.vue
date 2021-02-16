<template>
  <div id="banner" :style="getBannerSize">
    <!-- <span style="float: left; width:50rem; height:50rem; z-index:3; background-color:green;"></span> -->
    <span class="slogo" ref="slogo">{{ slogo }}</span>
    <ImageComponent :src="'skate_pool_2.jpg'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ImageComponent from "@/components/ImageComponent.vue";
import randomizer from "@/lib/randomizer";
import { translate, hide } from "@/lib/anime";
export default {
  data() {
    return {
      slogo: "",
    };
  },
  created() {},
  mounted() {
    this.slogo = randomizer.getRandomSlogo();
    translate(this.$refs.slogo, 150);
    let loop = () => {
      setTimeout(() => {
        hide(this.$refs.slogo, -150, 800);
        setTimeout(() => {
          this.slogo = randomizer.getRandomSlogo();
          translate(this.$refs.slogo, 150);
        }, 800);
        loop();
      }, 8000);
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
    // go(n, delay) {
    //   translate(this.$refs.slogo, n, delay);
    // },
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
  font-size: 5rem;
  font-weight: 800;
  float: right;
  text-align: center;
  position: absolute;
  width: 40rem;
  height: 800rem;
  top: 20%;
  left: 45%;
  // transform: translate(-50%, -50%);
  //transition: transform 2200ms, opacity 100ms ease, left 1000ms;
  // top: 48%;
  word-wrap: break-word;
  color: $blood-orange;
  // text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
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