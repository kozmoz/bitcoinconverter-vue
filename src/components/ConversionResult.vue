<template>
  <div>
    <div v-if="tickerPrices.updated">
      <h3>
        <template v-if="direction === DIRECTION_TOBTC">
          {{ $t(`message.${currency}_sign`) }} {{ amount || 0 }} = {{ calculatedResult | numberRound(5) }} BTC
        </template>
        <template v-else>
          {{ amount || 0 }} BTC = {{ calculatedResult | numberRound(2) }}
          {{ $t(`message.${currency}_sign`) }}
        </template>
      </h3>
      <p class="mb-0">
        <small class="text-muted">{{ $t('message.rate_updated') }}</small>
      </p>
      <p class="mb-0">
        <small v-if="tickerPrices.updated" class="text-muted">
          {{ $t('message.rate_update_time') }}
          {{ tickerPrices.updated | dateHHMM }}, 1 BTC =
          {{ $t(`message.${currency}_sign`) }}
          {{ tickerPrices[`rate${currency}`] | numberRound(2) }} (buy)
        </small>
      </p>
    </div>
    <div v-if="loadingStatus === LOADING_STATUS_LOADING">
      Loading/updating exchange rates...
    </div>
    <div v-if="loadErrorMessage" class="alert alert-danger mb-0" role="alert">
      {{ loadErrorMessage }}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import {
  DIRECTION_FROMBTC,
  DIRECTION_TOBTC,
  LOADING_STATUS_ERROR,
  LOADING_STATUS_LOADING,
  LOADING_STATUS_NOT_LOADING
} from '@/domain/constants';

/**
 * Component to calculate the final exchange rate.
 */
export default {
  props: {
    // No props.
  },
  data: () => ({
    DIRECTION_TOBTC,
    DIRECTION_FROMBTC,
    LOADING_STATUS_LOADING,
    LOADING_STATUS_NOT_LOADING,
    LOADING_STATUS_ERROR
  }),
  computed: {
    ...mapState(['currency', 'direction', 'amount', 'tickerPrices', 'loadingStatus', 'loadErrorMessage']),
    ...mapGetters(['calculatedResult'])
  },
  filters: {
    dateHHMM(value) {
      if (!value) {
        return '';
      }
      return ('00' + value.getHours()).substr(-2) + ':' + ('00' + value.getMinutes()).substr(-2);
    },
    numberRound(value, decimals) {
      if ((value !== 0 && !value) || !value.toFixed) {
        return '';
      }
      return value.toFixed(decimals || 2);
    }
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
</style>
