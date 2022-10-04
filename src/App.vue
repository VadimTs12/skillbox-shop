<template>
  <div>
    <HeaderComponent/>
    <router-view/>
    <FooterComponent/>
  </div>
  <div id="teleport-target"></div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>

<style lang="scss">

</style>
