<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image.file.url" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
               {{ item.product.id }}
              </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="removeOneProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <label for="count-input">
        <input type="text" v-model.number="quantity" name="count" id="count-input">
      </label>

      <button type="button" aria-label="Добавить один товар" @click.prevent="addOneProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.quantity * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="removeCart(item.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'CardItem',
  props: ['item'],
  filters: {
    numberFormat,
  },
  computed: {
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        this.$store.dispatch('updateCartProductQuantity', {
          productId: this.item.product.id,
          quantity: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations(['addOneProduct', 'removeOneProduct']),
    ...mapActions(['removeCartProduct']),
    removeCart() {
      this.removeCartProduct({
        productId: this.item.product.id,
      });
    },

  },
};
</script>

<style scoped>
.product__counter button {
  background-color: #ccc;
  cursor: pointer;
}
</style>
