<template>
  <label class="form__label">
              <textarea v-model="dataValue" class="form__input form__input--area" :name="name"
                        placeholder="Ваши пожелания"></textarea>
    <span class="form__value">Комментарий к заказу</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormTextarea',
  props: ['name'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
