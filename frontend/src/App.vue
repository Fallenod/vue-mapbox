<script setup>
import { onMounted, toRaw, watch } from 'vue';
import { storeToRefs } from 'pinia';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { usePlotsStore } from './app/usePlotsStore';

const store = usePlotsStore();
const { fetchPlots, fetchAddPlots, fetchDeletePlots, fetchUpdatePlots } = store;
const { data } = storeToRefs(store);
onMounted(() => {
  fetchPlots();
  function loadArea(e) {
    data.value.map((item) => draw.add(item));
  }
  function createArea(e) {
    draw.add(e.features[0]);
    fetchAddPlots(e.features[0]);
  }
  function deleteArea(e) {
    const currentId = e.features[0].id;
    fetchDeletePlots(currentId);
  }
  function updateArea(e) {
    const currentPlot = e.features[0];
    const currentId = e.features[0].id;
    fetchUpdatePlots(currentId, currentPlot);
  }
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFsbGVub2QiLCJhIjoiY2xndDlubng0MG15aTNmb2NhbmtpcG9kcSJ9.lPum8fgMB8DxAmaO1UXOuA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-122.45, 37.78],
    zoom: 10,
  });
  const draw = new MapboxDraw({
    displayControlsDefault: false,

    controls: {
      polygon: true,
      trash: true,
    },

    defaultMode: 'draw_polygon',
  });
  map.addControl(draw);
  map.on('load', loadArea);
  map.on('draw.create', createArea);
  map.on('draw.delete', deleteArea);
  map.on('draw.update', updateArea);
});
</script>

<template>
  <div class="main">
    <div id="map"></div>
    <GroupBlock :data="data" />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 2rem;
}
.calculation-box {
  height: 75px;
  width: 150px;
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  text-align: center;
}

p {
  font-family: 'Open Sans';
  margin: 0;
  font-size: 13px;
}
#map {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
