<template>
    <div class="form-group row">
        <legend class="col-form-label col-sm-3 pt-0">Direction</legend>
        <div class="col-sm-9">
            <div class="form-check" v-for="d in directions" :key="d">
                <input type="radio"
                       :id="`direction-${d}`"
                       name="direction"
                       class="form-check-input"
                       :value="d"
                       :checked="d === direction"
                       @change="$emit('update:direction', $event.target.value)"/>
                <label class="form-check-label" :for="`direction-${d}`">
                    {{ $t(`message.${d}_label`, { currency: $t(`message.${currency}_label`)}) }}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Component to select the conversion direction.
     */
    export default {
        props: {
            currency: String,
            direction: String,
            directions: Array
        }
    };
</script>