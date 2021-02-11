<template>
  <section :class="{ isActive: isModalActive }" class="modal"></section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
computed:{
    ...mapGetters(['modalStates']),
    isModalActive(){
        return this.modalStates.cover
    }
}
};
</script>