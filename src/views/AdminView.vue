<template>
    <div>
      CustomerName1
      Tacos Mix * 2
      Tacos Dinde * 3
      Totale : 40 DH
      In Progress

      <button> Complete </button>
      -------------------------------
      CustomerName2
      Sandwish nugget * 2
      Frite * 1
      Totale : 30 DH
      In Progress

      <button> Complete </button>


      
    </div>
  </template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    


    return {

    };
  },
};
</script>