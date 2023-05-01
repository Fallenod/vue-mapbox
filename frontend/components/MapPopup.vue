<script setup>
import { usePlotsStore } from '../src/app/usePlotsStore';
const store = usePlotsStore();
const { fetchDeletePlots, deletePlot } = store;
function handleClick(id) {
  deletePlot(id);
  fetchDeletePlots(id);
}
defineProps({
  id: Number,
  onClick: Function,
});
</script>
<template>
  <button @click="onClick">Удалить</button>
</template>
<style scoped>
/* .main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 2rem;
} */
</style>
