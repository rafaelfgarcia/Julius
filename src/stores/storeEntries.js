import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreEntries = defineStore('entries', () => {

  /**
   * store
   */

  const entries = ref([
    {
      id: 'id1',
      name: 'Salário',
      amount: 2000,
    },{
      id: 'id2',
      name: 'Água Viva',
      amount: -300,
    },{
      id: 'id3',
      name: 'Energia',
      amount: -300,
    },{
      id: 'id4',
      name: 'Internet2',
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
   * getters
   */

  //

  /**
   * actions
   */

  //

  /**
   * return
   */

  return { entries }
})
