<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price }} ₽
            </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(colorItem, index) in colors" :key="index">
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
export default {
  name: 'ProductItem',
  props: ['product'],
  data() {
    return {
      color: '',
      colors: ['#73B6EA', '#8BE000', '#222'],
    };
  },
};
</script>

<style scoped>

</style>
