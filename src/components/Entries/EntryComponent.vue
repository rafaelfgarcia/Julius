<template>
  <q-slide-item
    @right="onEntrySlideRight"
    left-color="positive" right-color="negative"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>
    <q-item>
      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="entry.name"
          auto-save
          v-slot="scope"
          :cover="false"
          :offset="[16,11]"
          anchor="top left"
          buttons
          label-set="Ok"
          label-cancel="Cancelar"
          >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
          />
        </q-popup-edit>
      </q-item-section>
      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
        side
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          auto-save
          v-slot="scope"
          :cover="false"
          :offset="[16,11]"
          anchor="top left"
          buttons
          label-set="Ok"
          label-cancel="Cancelar"
          >
          <q-input
            v-model.number="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none text-right"
            type="number"
            step="0.01"
          />
        </q-popup-edit>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>

  /**
   * imports
   */

  import { useQuasar } from 'quasar'
  import { useStoreEntries } from 'src/stores/storeEntries'
  import { useCurrencify } from 'src/use/useCurrencify'
  import { useAmountColorClass } from 'src/use/useAmountColorClass'

  /**
   * stores
   */

  const storeEntries = useStoreEntries();

  /**
   * props
   */

  const props = defineProps({
    entry: {
      type: Object,
      required: true
    }
  });

  /**
   * quasar
   */

  const $q = useQuasar();

  /**
   * slide items
   */

  const onEntrySlideRight = ({ reset }) => {
    $q.dialog({
      title: 'Excluir Registro',
      message: 'Deseja excluir o registro? <div class="q-mt-md text-weight-bold">' + props.entry.name + ': ' + useCurrencify(props.entry.amount) + '</div>',
      persistent: true,
      html: true,
      ok: {
        label: 'Delete',
        color: 'negative',
        noCaps: true
      },
      cancel: {
        color: 'primary',
        noCaps: true
      }
    }).onOk(() => {
       storeEntries.deleteEntry(props.entry.id);
    }).onCancel(() => {
       reset();
    });
  }

  /**
   * name & amount update
   */

  const onNameUpdate = value => {
    storeEntries.updateEntry(props.entry.id, { name: value })
  }

  const onAmountUpdate = value => {
    storeEntries.updateEntry(props.entry.id, { amount: value })
  }

</script>
