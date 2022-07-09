<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow " href="#"
         :class="{'pagination__link--disabled': this.page === 1 }"
         aria-label="Предыдущая страница"
         @click.prevent="pagePrev">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
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
          <use xlink:href="#icon-arrow-right"></use>
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
