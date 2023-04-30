<script setup>
import deleteLogo from '../assets/delete.png';

defineProps({
  id: Number,
});
</script>

<template>
  <div class="groupItem">
    <div>
      <p class="text">{{ id }}</p>
    </div>
    <div>
      <div class="iconWrapper">
        <img class="icon" :src="deleteLogo" alt="delete" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text {
  color: #fff;
}
.groupItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  background-color: #0000004f;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
}
.iconWrapper {
  width: 2rem;
  height: 2rem;
}
.icon {
  width: 100%;
  height: 100%;
}
</style>
