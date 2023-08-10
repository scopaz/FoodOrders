<template>
  <div class="food-item">
    <div class="food-details">
      <div class="food-name">{{ fooditem.name }}</div>
      <div class="food-description">{{ fooditem.description }}</div>
      <div class="food-price">{{ fooditem.price }} DH</div>
    </div>
    <div class="quantity-control">
      <button @click="handleClick(Operations.Minus)" class="quantity-button">-</button>
      <div class="quantity">{{ quantity }}</div>
      <button @click="handleClick(Operations.Plus)" class="quantity-button">+</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
const Operations = {
  Minus: 'minus',  
  Plus: 'plus',
};

let quantity = ref(0);
let qtySelected = ref(0);

// Declare the props using the `defineProps` function
const { fooditem, selectedFoodItems } = defineProps(['fooditem', 'selected-food-items']);
// Declare the emits using the `defineEmits` function
const emit = defineEmits();

const store = useStore();
const handleClick = (operator) => {
  
  if(operator == Operations.Minus && quantity.value > 0) {
    store.commit('fooditem/removeFromSelectedFoodItems', { fooditem, quantity: operator });
    quantity.value--;
  }
  if(operator == Operations.Plus) {
    store.commit('fooditem/addToSelectedFoodItems', { fooditem, quantity: operator });
    quantity.value++;
  }

  // Dispatch an cteaction to add the seled food item and quantity to the store
};

onMounted(() => {
  const selectedItem = selectedFoodItems ? selectedFoodItems.filter(item => item.fooditem.foodItemID === fooditem.foodItemID).length : null;
  if (selectedItem) {
    quantity.value = selectedItem;
  } else {
    quantity.value = 0;
  }
});
</script>


<style scoped>
.food-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.food-details {
  flex: 1;
}

.food-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.food-description {
  font-size: 0.9rem;
  color: #666;
}

.food-price {
  font-size: 1.1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-button {
  padding: 5px 10px;
  font-size: 1.2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-button:hover {
  background-color: #2980b9;
}

.quantity {
  font-size: 1.2rem;
  margin: 0 10px;
}
</style>