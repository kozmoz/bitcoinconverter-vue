<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="currencyField">{{ $t("message.currency") }}</label>
    <div class="col-sm-9">
      <select id="currencyField" :value="currency" class="form-control" name="currencyField" @change="$emit('update:currency', $event.target.value)">
        <option v-for="currency in currencies" :key="currency" :value="currency">
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
