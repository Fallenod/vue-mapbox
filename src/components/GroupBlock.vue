<script setup>
import GroupItem from './GroupItem.vue';

defineProps({
  data: Array,
});
</script>

<template>
  <div class="groupBlock">
    <GroupItem v-for="item in data" :id="item.id" class="groupItem" />
  </div>
</template>

<style scoped>
.groupBlock {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 37.5rem;
  height: 100%;
  padding: 0 1rem;
}
</style>
