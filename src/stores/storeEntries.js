import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { uid, Notify } from 'quasar'

export const useStoreEntries = defineStore('entries', () => {
  /**
   * store
   */

  const entries = ref([
    {
      id: 'id1',
      name: 'Salário',
      amount: 2000,
    },
    {
      id: 'id2',
      name: 'Água Viva',
      amount: -300,
    },
    {
      id: 'id3',
      name: 'Energia',
      amount: 300,
    },
    {
      id: 'id4',
      name: 'Internet',
      amount: -80,
    },
    {
      id: 'id5',
      name: 'Carro',
      amount: -800,
    },
    {
      id: 'id6',
      name: 'teste',
      amount: 50,
    },
  ])

  /**
   * getters
   */

  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount
    }, 0)
  })

  /**
   * actions
   */

  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid() })
    entries.value.push(newEntry)
  }

  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Excluído com sucesso.',
      position: 'top',
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  /**
   * helpers
   */

  const getEntryIndexById = (entryId) => {
    return entries.value.findIndex((entry) => entry.id === entryId)
  }

  /**
   * return
   */

  return {
    // state
    entries,

    // getters
    balance,

    // actions
    addEntry,
    deleteEntry,
    updateEntry,
  }
})
