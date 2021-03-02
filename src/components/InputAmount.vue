<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="amount">{{ $t("message.amount") }}</label>
    <div class="col-sm-9">
      <div class="input-group w-75">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ $t(`message.${currency}_sign`) }}</span>
        </div>
        <!--suppress JSUnresolvedVariable -->
        <input
          id="amount"
          v-validate="'numeric'"
          :class="{ 'is-invalid': errors.has('amount') }"
          :value="amount"
          class="form-control"
          maxlength="10"
          name="amount"
          type="text"
          @input="update($event.target.value)"
        />
        <!--suppress JSUnresolvedVariable -->
        <div v-if="errors.has('amount')" class="invalid-feedback">
          {{ $t("message.amount_error") }}
        </div>
      </div>
      <small class="form-text text-muted">{{ $t("message.inputamount-formtext-integer") }}</small>
    </div>
  </div>
</template>

<script>
/**
 * Component to enter the amount for the exchange.
 */
export default {
  props: {
    amount: Number || undefined,
    currency: String
  },
  methods: {
    /**
     * Convert amount to number/undefined and emit an update event.
     *
     * @param value Input element value to update
     */
    update: function(value) {
      if (value === '') {
        this.$emit('update:amount', undefined);
      } else if (/^[0-9]+$/.test(value)) {
        this.$emit('update:amount', parseInt(value, 10));
      }
    }
  }
};
</script>
