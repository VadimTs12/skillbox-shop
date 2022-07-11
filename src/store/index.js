import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 2,
      },
    ],
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },

  },
  mutations: {
    addProductToCart(state, {
      productId,
      amount,
    }) {
      const itemProduct = state.cartProducts.find((item) => item.productId === productId);

      if (itemProduct) {
        itemProduct.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    UpdateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const itemProduct = state.cartProducts.find((item) => item.productId === productId);
      if (itemProduct) {
        itemProduct.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
  },
  actions: {},
  modules: {},
});
