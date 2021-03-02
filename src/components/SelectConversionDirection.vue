<template>
  <div class="form-group row">
    <legend class="col-form-label col-sm-3 pt-0">
      {{ $t("message.direction") }}
    </legend>
    <div class="col-sm-9">
      <div v-for="d in directions" :key="d" class="form-check">
        <input
          :id="`direction-${d}`"
          :checked="d === direction"
          :value="d"
          class="form-check-input"
          name="direction"
          type="radio"
          @change="$emit('update:direction', $event.target.value)"
        />
        <label :for="`direction-${d}`" class="form-check-label">
          {{
            $t(`message.${d}_label`, {
              currency: $t(`message.${currency}_label`)
            })
          }}
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
