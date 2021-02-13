<template>
  <section class='wrapper'>
    <h1>Admin Products</h1>

    <h1>Orders</h1>
  </section>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('closeAllModals')
    this.$store.dispatch('changeBannerSize', {
      maxHeight:100
    })
  }
}
</script>

<style>

</style>