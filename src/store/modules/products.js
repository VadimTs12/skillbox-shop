import axios from 'axios';
import API_BASE_URL from '@/config';

const state = {
  filterPriceFrom: 0,
  filterPriceTo: 0,
  filterCategoryId: 0,
  filterColor: '',
  page: 1,
  productsPerPage: 6,
  productsData: null,
  productsLoading: false,
  productsLoadingFailed: false,
};
const getters = {
  products(state) {
    return state.productsData
      ? state.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      }))
      : [];
  },
  pages(state, getters) {
    return Math.ceil(getters.allProducts / state.productsPerPage);
  },
  allProducts() {
    return state.productsData ? state.productsData.pagination.total : 0;
  },
  productsIsLoading(state) {
    return state.productsLoading;
  },
  productsIsLoadingFailed(state) {
    return state.productsLoadingFailed;
  },
};
const mutations = {
  paginate(state, page) {
    state.page = page;
  },
  pageNext(state, getters) {
    if (state.page !== getters.allProducts / state.productsPerPage) state.page += 1;
  },
  pagePrev(state) {
    if (state.page !== 1) state.page -= 1;
  },
};
const actions = {
  loadProducts() {
    state.productsLoading = true;
    state.productsLoadingFailed = false;
    axios.get(`${API_BASE_URL}/api/products`, {
      params: {
        page: state.page,
        limit: state.productsPerPage,
        categoryId: state.filterCategoryId,
        minPrice: state.filterPriceFrom,
        maxPrice: state.filterPriceTo,
        colorId: state.filterColor,
      },
    })
      .then((response) => {
        state.productsData = response.data;
      })
      .catch(() => {
        state.productsLoadingFailed = true;
      })
      .then(() => {
        state.productsLoading = false;
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
