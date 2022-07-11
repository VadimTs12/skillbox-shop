<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow " href="#"
         :class="{'pagination__link--disabled': this.page === 1 }"
         aria-label="Предыдущая страница"
         @click.prevent="pagePrev">
        <svg width="8" height="14" fill="currentColor">
          <path d="M6 12H4v-2h2v2zm-2-2H2V8h2v2zM2 8H0V6h2v2zm2-2H2V4h2v2zm2-2H4V2h2v2zm2-2H6V0h2v2zm0 12H6v-2h2v2z"></path>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNumber===page}"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
         :class="{'pagination__link--disabled': this.page === this.count / this.perPage }"
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
export default {
  name: 'BasePagination',
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    pageNext() {
      if (this.page !== this.count / this.perPage) this.$emit('paginate', this.page + 1);
    },
    pagePrev() {
      if (this.page !== 1) this.$emit('paginate', this.page - 1);
    },
  },
};
</script>

<style scoped>
</style>
