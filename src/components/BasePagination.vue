<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow " href="#"
         :class="{'pagination__link--disabled': $store.state.products.page === 1 }"
         aria-label="Предыдущая страница"
         @click.prevent="pagePrev">
        <svg width="8" height="14" fill="currentColor">
          <path d="M6 12H4v-2h2v2zm-2-2H2V8h2v2zM2 8H0V6h2v2zm2-2H2V4h2v2zm2-2H4V2h2v2zm2-2H6V0h2v2zm0 12H6v-2h2v2z"></path>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNumber===$store.state.products.page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
         :class="{'pagination__link--disabled': $store.state.products.page === pages }"
         aria-label="Следующая страница"
         @click.prevent="pageNext">
        <svg width="8" height="14" fill="currentColor">
          <path d="M2 2h2v2H2V2zm2 2h2v2H4V4zm2 2h2v2H6V6zM4 8h2v2H4V8zm-2 2h2v2H2v-2zm-2 2h2v2H0v-2zM0 0h2v2H0V0z"></path>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'BasePagination',
  computed: {
    ...mapGetters(['pages', 'allProducts']),
  },
  methods: {
    ...mapMutations(['paginate', 'pageNext', 'pagePrev']),
    ...mapActions(['loadProducts']),
  },
  watch: {
    // eslint-disable-next-line func-names
    '$store.state.products.page': function () {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped lang="scss">

.pagination__link {
  &--arrow {
    border: 1px solid #727272;
    border-radius: 10px;
  }

  &--disabled {
    pointer-events: none;
    border: 1px solid #a4a3a3;

    svg {
      fill:  #a4a3a3
    }
  }
}

</style>
