import axios from 'axios';
import API_BASE_URL from '@/config';

const state = {
  cartProducts: [],
  userAccessKey: null,
  orderInfo: null,
};

const getters = {
  cartTotalPrice(state, getters) {
    return getters.cartProductsData.reduce((acc, item) => (item.price * item.quantity) + acc, 0);
  },
  cartProductsData(state) {
    return state.cartProducts;
  },
  orderInfoData(state) {
    return state.orderInfo;
  },
};

const mutations = {
  updateOrderInfo(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
  resetCart(state) {
    state.cartProducts = [];
  },
  updateCartProductQuantity(state, {
    productId,
    quantity,
  }) {
    const itemProduct = state.cartProducts.find((item) => item.product.id === productId);
    if (itemProduct) {
      itemProduct.quantity = quantity;
    }
  },
  removeCartProduct(state, productId) {
    state.cartProducts = state.cartProducts.filter((item) => item.product.id !== productId);
  },
  addOneProduct(state, productId) {
    state.cartProducts = state.cartProducts.map((item) => {
      if (item.productId === productId) {
        // eslint-disable-next-line no-param-reassign
        item.amount += 1;
        return item;
      }
      return item;
    });
  },
  removeOneProduct(state, productId) {
    state.cartProducts = state.cartProducts.filter((item) => {
      if (item.productId === productId) {
        if (item.amount > 1) {
          // eslint-disable-next-line no-param-reassign
          item.amount -= 1;
          return item;
        }
        return item.productId !== productId;
      }
      return item;
    });
  },
  updateUserAccessKey(state, accessKey) {
    state.userAccessKey = accessKey;
  },
  updateCartProductData(state, cartProducts) {
    state.cartProducts = cartProducts;
  },
};
const actions = {
  loadOrderInfo(context, orderId) {
    return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        context.commit('updateOrderInfo', response.data);
      })
      .catch((error) => console.log(error.message));
  },
  loadCart(context) {
    return axios.get(`${API_BASE_URL}/api/baskets`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductData', response.data.items);
      })
      .catch((error) => console.log(error));
  },
  addProductToCard(context, {
    productId,
    quantity,
  }) {
    return axios.post(`${API_BASE_URL}/api/baskets/products`, {
      productId,
      quantity,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        context.commit('updateCartProductData', response.data.items);
      })
      .catch((error) => console.log(error));
  },
  removeCartProduct(context, { productId }) {
    context.commit('removeCartProduct', productId);
    return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        productId,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  updateCartProductQuantity(context, {
    productId,
    quantity,
  }) {
    context.commit('updateCartProductQuantity', {
      productId,
      quantity,
    });
    return axios.put(`${API_BASE_URL}/api/baskets/products`, {
      productId,
      quantity,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        context.commit('updateCartProductData', response.data.items);
      })
      .catch((error) => console.log(error));
  },

};
export default {
  state,
  getters,
  actions,
  mutations,
};
