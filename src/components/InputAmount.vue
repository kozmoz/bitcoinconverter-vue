<template>
    <div class="form-group row">
        <label for="amount" class="col-sm-3 col-form-label">Amount</label>
        <div class="col-sm-9">
            <div class="input-group w-75">
                <div class="input-group-prepend">
                    <span class="input-group-text">{{ $t(`message.${currency}_sign`) }}</span>
                </div>
                <input id="amount"
                       name="amount"
                       type="text"
                       maxlength="10"
                       v-validate="'numeric'"
                       :value="amount"
                       @input="update($event.target.value)"
                       class="form-control"
                       :class="{'is-invalid': errors.has('amount')}"/>
                <div class="invalid-feedback" v-if="errors.has('amount')">Only numbers are allowed</div>
            </div>
            <small class="form-text text-muted">{{$t('message.inputamount-formtext-integer')}}</small>
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
            update: function (value) {
                if (value === '') {
                    this.$emit('update:amount', undefined);
                } else if (/^[0-9]+$/.test(value)) {
                    this.$emit('update:amount', parseInt(value, 10));
                }
            }
        }
    }
</script>
