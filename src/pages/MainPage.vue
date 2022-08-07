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
        <div class="loading" v-if="productsIsLoading">загрузка...</div>
        <div class="failed" v-if="productsIsLoadingFailed">Ошибка
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
        <ProductList/>
        <BasePagination/>
      </section>

    </div>
  </main>
</template>

<script>

import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainPage',
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
    };
  },
  computed: {
    ...mapGetters(['products', 'allProducts', 'productsIsLoading', 'productsIsLoadingFailed']),
  },
  methods: {
    ...mapActions(['loadProducts']),
  },
  watch: {
    filterPriceForm() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style lang="scss">
.catalog {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  align-self: stretch;

  &__list {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 270px);
    grid-gap: 65px 30px;
    margin: 0 0 70px;
  }

  &__pic {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    margin-bottom: 20px;

    img {
      object-fit: contain;
    }
  }

  &__title {
    margin: 0 0 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    a {
      -webkit-transition: all .2s ease;
      transition: all .2s ease;

      &:focus, &:hover {
        opacity: .6;
      }
    }
  }

  &__price {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
  }

  &__pagination {
    margin-top: auto;
  }
}

</style>
