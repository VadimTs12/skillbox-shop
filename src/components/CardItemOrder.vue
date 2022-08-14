<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ item.product.price  | numberFormat }} ₽</b>
    <span>{{ item.productId }}</span>
  </li>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CardItemOrder',
  props: ['item'],
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>

</style>
