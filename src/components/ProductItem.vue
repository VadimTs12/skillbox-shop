<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}" >
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
            </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(colorItem, index) in product.colors" :key="index">
        <label class="colors__label" :for="'colors__radio-input_' + product.id + index">
          <input class="colors__radio sr-only" :id="'colors__radio-input_' + product.id + index"
                 type="radio"
                 v-model="color"
                 name="color" :value="colorItem" checked="">
          <span class="colors__value" :style="{backgroundColor: colorItem}">
                  </span>
        </label>
      </li>

    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],
  filters: {
    numberFormat,
  },
  data() {
    return {
      color: '',
    };
  },
  methods: {
    gotoPage,
  },
};
</script>

<style scoped>

</style>
