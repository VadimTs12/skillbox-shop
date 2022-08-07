<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="form__input_1">
          <input class="form__input" id="form__input_1" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="form__input_2">
          <input class="form__input" id="form__input_2" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="form__label--select">
          <select class="form__select" id="form__label--select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="(colorItem, index) in colors" :key="index">
            <label class="colors__label" :for="'colors__radio-input_'  + index">
              <input class="colors__radio sr-only" :id="'colors__radio-input_'  + index" type="radio" name="color"
                     v-model="currentColor" :value="colorItem" checked="">
              <span class="colors__value" :style="{backgroundColor: colorItem.color}">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: '',
    };
  },
  computed: {
    ...mapGetters(['categories', 'colors']),
  },
  methods: {
    ...mapActions(['loadCategories', 'loadColors']),
    ...mapMutations(['filterParametersProduct']),
    submit() {
      const value = {
        currentPriceTo: this.currentPriceTo,
        currentPriceFrom: this.currentPriceFrom,
        currentCategoryId: this.currentCategoryId,
        currentColor: this.currentColor,
      };
      this.filterParametersProduct(value);
    },
    reset() {
      const value = {
        currentPriceTo: 0,
        currentPriceFrom: 0,
        currentCategoryId: 0,
        currentColor: '',
      };
      this.filterParametersProduct(value);
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>

<style scoped>

</style>
