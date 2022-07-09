<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceForm"
                     :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color.sync="filterColor"
      />
      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="allProducts" :per-page="productsPerPage"/>
      </section>

    </div>
  </main>

</template>

<script>

import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import products from '@/data/products';

export default {
  name: 'App',
  components: {
    ProductFilter,
    BasePagination,
    ProductList,
  },
  data() {
    return {
      filterPriceForm: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '',
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let filterProducts = products;
      if (this.filterPriceForm > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.filterPriceForm);
      }
      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filterProducts = filterProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColor) {
        filterProducts = filterProducts.filter((product) => product.colors.includes(this.filterColor));
      }
      return filterProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filterProducts.slice(offset, offset + this.productsPerPage);
    },
    allProducts() {
      return this.filterProducts.length;
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
