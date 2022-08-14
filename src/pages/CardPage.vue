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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProductsData.length }} товар(а)
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CardItem v-for="item in cartProductsData" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <router-link :to="{name:'order'}">
            <button class="cart__button button button--primery" type="submit" :disabled="cartProductsData.length===0">
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CardItem from '@/components/CardItem.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CardPage',
  components: { CardItem },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['cartProductsData', 'cartTotalPrice']),
  },

};
</script>

<style scoped>

</style>
