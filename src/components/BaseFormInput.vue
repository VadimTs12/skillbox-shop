<template>
  <label class="form__label">
    <input class="form__input" v-model="dataValue" :type="type" name="address" :placeholder="placeholder"/>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormInput',
  props: ['title', 'type', 'error', 'placeholder', 'value'],
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
