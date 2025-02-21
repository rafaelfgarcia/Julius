<template>
  <div class="row q-mb-sm q-px-sm q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">
      Saldo
    </div>
    <div
      class="col text-h6 text-right"
      :class="useAmountColorClass(storeEntries.balance)"
    >
      {{ useCurrencify(storeEntries.balance) }}
    </div>
  </div>
</template>

<script setup>

  /**
   * imports
   */

  import { useStoreEntries } from 'src/stores/storeEntries'
  import { useCurrencify } from 'src/use/useCurrencify'
  import { useAmountColorClass } from 'src/use/useAmountColorClass'

  /**
   * stores
   */

  const storeEntries = useStoreEntries();

</script>
