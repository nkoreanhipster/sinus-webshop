<template>
  <!-- 
        {
          "_id":"GuqDUmEKIx2vQLSq" // generated serverside
          "title"
          "price" {Number}
          "shortDesc"
          "category"
          "longDesc"
          "imgFile"  // Asset logic on clientside
          "serial"{Number}
        }
   -->
  <div>
    <p>title: {{ product.title }}</p>
    <span>
      <i>price: {{ product.price }} </i>
      <i>category: {{ product.category }}</i>
      <i>serial: {{ product.serial }}</i>
    </span>
    <p>shortDesc: {{ product.shortDesc }}</p>
    <p>longDesc: {{ product.longDesc }}</p>
    <img
      :src="product.imgFile"
      @error="$event.target.src = '/images/gallagher-not.found.png'"
    />
    <p><u>countOfDuplicates: {{ product.countOfDuplicates }}</u></p>

  </div>
</template>

<script>
export default {
  props: {
    // ProductObject från parent
    product: Object,
  },
};
</script>

<style>
</style>