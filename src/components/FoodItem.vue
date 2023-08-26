<template>
  <IonCard class="food-item">
    <IonCardContent class="food-details">
      <div class="food-name">{{ fooditem.name }}</div>
      <div class="food-description">{{ fooditem.description }}</div>
      <div class="food-price">{{ fooditem.price }} DH</div>
    </IonCardContent>
    <div class="quantity-control">
      <IonButton @click="handleClick(Operations.Minus)" class="quantity-button" expand="full" size="small" shape="round">-</IonButton>
      <div class="quantity">{{ quantity }}</div>
      <IonButton @click="handleClick(Operations.Plus)" class="quantity-button" expand="full" size="small" shape="round">+</IonButton>
    </div>
  </IonCard>
</template>

<script setup>

import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { IonicSlides, IonButton, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonThumbnail, IonLabel, IonList} from '@ionic/vue';
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





.quantity {
  font-size: 1.2rem;
  margin: 0 10px;
}


</style>