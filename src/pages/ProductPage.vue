<template>

  <main class="content container">
    <div class="loading" v-if="productsLoading">загрузка...</div>
    <div class="failed" v-if="productsLoadingFailed">Ошибка блат
      <button @click.prevent="loadProducts">Попробовать еще раз</button>
    </div>
    <section v-if="productsData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">

        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addCart">
              <b class="item__price">
                {{ product.price | numberFormat }}
              </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
                    <label class="colors__label" :for="'colors__radio-input_' +  index">
                      <input class="colors__radio sr-only" type="radio" name="color-item" value="blue" checked=""
                             :id="'colors__radio-input_' +  index">
                      <span class="colors__value" :style="{backgroundColor: color}">
                    </span>
                    </label>
                  </li>
                </ul>
              </fieldset>
              <div class="item__row">
                <div class="form__counter">
                  <button type="button" aria-label="Убрать один товар">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <label for="input-count">
                    <input type="text" value="1" id="input-count" name="count" v-model.number="productQuantity"/>
                  </label>

                  <button type="button" aria-label="Добавить один товар" @click.prevent="addOneProduct(product)">
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>

                <button class="button button--primery" type="submit" :disabled="productAddSending">
                  <span v-if="!productAddSending">В корзину</span> <span v-else><span class="loader"></span></span>
                </button>
                <div v-if="productAdded">Товар добавлен в корзину</div>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>

            <a href="#">
              Все характеристики
            </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально
              эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
              отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное
              приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
              сигнал
              с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает
              габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей
              диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков
              информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус
              велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
              кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations, mapActions } from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  name: 'ProductPage',
  filters: {
    numberFormat,
  },
  data() {
    return {
      images: [
        'img/phone-square-1.jpg',
        'img/phone-square-2.jpg',
        'img/phone-square-3.jpg',
        'img/phone-square-4.jpg'],
      productQuantity: 1,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  computed: {
    product() {
      return this.productsData;
    },
    category() {
      return this.productsData.category;
    },
  },
  methods: {
    ...mapMutations(['addOneProduct', 'removeOneProduct']),
    ...mapActions(['addProductToCard']),
    addCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCard({
        productId: this.product.id,
        quantity: this.productQuantity,
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProducts() {
      this.productLoading = true;
      this.productsLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productsData = response.data;
        })
        .catch(() => {
          this.productsLoadingFailed = true;
        })
        .then(() => {
          this.productsLoading = false;
        });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProducts();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite
}

.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: -26px;
  border-radius: 50%;
  border: 20px solid #FFF;
  animation: prixClipFix 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg)
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
  }
}
</style>
