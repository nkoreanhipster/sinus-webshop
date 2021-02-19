<template>
  <article class="product-item mh-3">
    <div class="content">
      <div class="checkout-bag bag hoverride" @click="addToCart(product)">
        <a class=""></a>
      </div>
      <img
        class="img-280-320"
        :src="`${product.imgFile}`"
        alt="Image not found"
        @click.self="goToDetailedView"
      />
    </div>

    <aside class="">
      <p>
        <span class="title"> {{ product.title }}</span>
        <span class="price">
          <b>{{ product.price }}</b
          ><i> SEK</i></span
        >
      </p>
      <div>
        <i>{{ product.shortDesc }}</i>
      </div>
    </aside>
  </article>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addProductToCart", this.product);
    },
    goToDetailedView() {
      this.$parent.$emit("selectedProduct", this.product);
      this.$store.dispatch("toggleModal", "cover");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
.product-item {
  display: flex;
  flex-direction: column;
  background-color: $gray-x;
  margin: 0.25rem;
  margin-bottom: 2rem;
  align-items: center;
  transition: background-color 100ms ease;
  border: 0.4rem solid transparent; // To avoid hover wompyness
  cursor: pointer;
  & aside {
    width: 100%;
    border-top: 0.6rem solid $white;
    padding: 0.8rem 2rem;
    & p {
      display: flex;
      justify-content: space-between;
    }
    & .price {
      font-size: 2.4rem;
      font-weight: 800;
    }
  }
  &:hover {
    background-color: $gray-1;
  }
}

.content {
  position: relative;
  display: inline-block;
  & .bag {
    position: absolute;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;
  }
}

.img-280-320 {
  width: 280px;
  height: 320px;
  object-fit: cover;
}
</style>