<template>
  <div class="form-group row">
    <label for="currencyField" class="col-sm-3 col-form-label">{{
      $t("message.currency")
    }}</label>
    <div class="col-sm-9">
      <select
        id="currencyField"
        name="currencyField"
        class="form-control"
        :value="currency"
        @change="$emit('update:currency', $event.target.value)"
      >
        <option
          v-for="currency in currencies"
          :value="currency"
          :key="currency"
        >
          {{ $t(`message.${currency}_label`) }}
          {{ $t(`message.${currency}_sign`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
/**
 * Component to select currency from a list of currencies.
 */
export default {
  props: {
    currency: String,
    currencies: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
