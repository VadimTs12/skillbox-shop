import Vue from 'vue';
import Vuex from 'vuex';
import cart from '@/store/modules/cart';
import products from '@/store/modules/products';
import filter from '@/store/modules/filter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products,
    filter,
  },
});
