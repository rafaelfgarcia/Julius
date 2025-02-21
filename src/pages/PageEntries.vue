<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-slide-item
          v-for="entry in entries"
          :key="entry.id"
          @right="onEntrySlideRight($event, entry)"
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
            </q-item-section>

            <q-item-section
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
              side
            >
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-sm q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance
        </div>
        <div
          class="col text-h6 text-right"
          :class="useAmountColorClass(balance)"
        >
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form
        @submit="addEntry"
        class="row q-pa-sm q-col-gutter-sm bg-primary"
      >
        <div class="col">
          <q-input
            v-model="addEntryForm.name"
            ref="nameRef"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
            input-class="text-right"
            placeholder="Amount"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn
            color="primary"
            icon="add"
            type="submit"
            round
          />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>

  /**
   * imports
   */

  import { ref, computed, reactive } from 'vue'
  import { uid, useQuasar } from 'quasar'
  import { useStoreEntries } from 'src/stores/storeEntries'
  import { useCurrencify } from 'src/use/useCurrencify'
  import { useAmountColorClass } from 'src/use/useAmountColorClass'

  /**
   * stores
   */

  const storeEntries = useStoreEntries();

  /**
   * quasar
   */

  const $q = useQuasar();

  /**
   * entries
   */

  const entries = ref([
    {
      id: 'id1',
      name: 'Salário',
      amount: 2000,
    },{
      id: 'id2',
      name: 'Água',
      amount: -100,
    },{
      id: 'id3',
      name: 'Energia',
      amount: -300,
    },{
      id: 'id4',
      name: 'Internet',
      amount: -80,
    },{
      id: 'id5',
      name: 'Carro',
      amount: -800,
    },{
      id: 'id6',
      name: 'teste',
      amount: 50,
    }
  ]);

  /**
   * balance
   */

  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount;
    }, 0);
  });

  /**
   * add entry
   */

  const nameRef = ref(null)

  const addEntryFormDefault = {
    name: '',
    amount: null
  }

  const addEntryForm = reactive({
    ...addEntryFormDefault
  });

  const addEntryFormReset = () => {
    Object.assign(addEntryForm, addEntryFormDefault);
    nameRef.value.focus();
  };

  const addEntry = () => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid() });
    entries.value.push(newEntry);
    addEntryFormReset();
  }

  /**
   * slide items
   */

  const onEntrySlideRight = ({ reset }, entry) => {
    $q.dialog({
      title: 'Excluir Registro',
      message: 'Deseja excluir o registro? <div class="q-mt-md text-weight-bold">' + entry.name + ': ' + useCurrencify(entry.amount) + '</div>',
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
       deleteEntry(entry.id);
    }).onCancel(() => {
       reset();
    });
  }

  /**
   * delete entry
   */

  const deleteEntry = entryId => {
    const index = entries.value.findIndex(entry => entry.id === entryId);
    entries.value.splice(index, 1);
    $q.notify({
      message: 'Excluído com sucesso.',
      position: 'top'
    });
  }

</script>
