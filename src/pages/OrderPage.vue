<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ $store.getters.cartProductsData.length }} {{ ($store.getters.cartProductsData.length > 1) ? 'товара' : 'товар' }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormInput v-model="formData.name" type="text" :error="formError.name" title="ФИО"
                           placeholder="Введите ваше полное имя"/>
            <BaseFormInput v-model="formData.address" type="text" :error="formError.address" title="Адрес доставки"
                           placeholder="Введите ваш адрес"/>
            <BaseFormInput v-model="formData.phone" type="tel" :error="formError.phone" title="Телефон"
                           placeholder="Введите ваш телефон"/>
            <BaseFormInput v-model="formData.email" type="text" :error="formError.email" title="Email"
                           placeholder="Введите ваш email"/>

            <BaseFormTextarea v-model="formData.comment" name="comments"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <CardItemOrder v-for="item in cartProductsData" :key="item.productId" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b> {{ $store.getters.cartProductsData.length }}</b> товара на сумму <b>{{ cartTotalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Добавить товар в корзину</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CardItemOrder from '@/components/CardItemOrder.vue';
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'OrderPage',
  components: {
    BaseFormTextarea,
    BaseFormInput,
    CardItemOrder,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },

  computed: {
    ...mapGetters(['cartProductsData', 'cartTotalPrice']),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.cart.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id },
          });
          this.formData = {};
        })
        .catch((error) => {
          this.formErrorMessage = error.response.data.error.message;
          this.formError = error.response.data.error.request || {};
        });
    },
  },
};
</script>

<style scoped>

</style>
