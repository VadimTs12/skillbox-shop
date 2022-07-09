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
          <select class="form__select" id="form__label--select" name="category" v-model.number="currentCategoryId"
                  @input="$emit('input', $event.target.value)">
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
                     :value="colorItem" checked="">
              <span class="colors__value" :style="{backgroundColor: colorItem}">
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
import categories from '@/data/categories';

export default {
  name: 'ProductFilter',
  props: ['priceFrom', 'priceTo', 'categoryId'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      colors: ['#73B6EA', '#FFBE15', '#939393', '#8BE000', '#FF6B00', '#FFF', '#000'],
    };
  },
  computed: {
    categories() {
      return categories;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
    },
  },
};
</script>

<style scoped>

</style>
