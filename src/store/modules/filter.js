import axios from 'axios';
import API_BASE_URL from '@/config';
import products from '@/store/modules/products';

const state = {
  categoriesData: null,
  colorsData: null,
};
const getters = {
  categories(state) {
    return state.categoriesData ? state.categoriesData.items : [];
  },
  colors(state) {
    return state.colorsData;
  },
};
const mutations = {
  filterParametersProduct(state, value) {
    products.state.filterPriceTo = value.currentPriceTo;
    products.state.filterPriceFrom = value.currentPriceFrom;
    products.state.filterCategoryId = value.currentCategoryId;
    products.state.filterColor = value.currentColor.id;
    products.actions.loadProducts();
  },
};
const actions = {
  loadCategories() {
    axios.get(`${API_BASE_URL}/api/productCategories`)
      .then((response) => {
        state.categoriesData = response.data;
      });
  },
  loadColors() {
    axios.get(`${API_BASE_URL}/api/products`)
      .then((response) => {
        state.colorsData = response.data;
        state.colorsData = state.colorsData.items.map((item) => item.colors.map((color) => ({
          color: color.code,
          id: color.id,
        })))
          .flat();
        const tmpArray = [];
        state.colorsData = state.colorsData.filter((item) => {
          if (tmpArray.indexOf(item.id) === -1) {
            tmpArray.push(item.id);
            return true;
          }
          return false;
        });
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
