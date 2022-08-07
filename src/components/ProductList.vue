<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductList',
  components: { ProductItem },
  computed: {
    ...mapGetters(['products']),
  },
};
</script>

<style scoped>

</style>
