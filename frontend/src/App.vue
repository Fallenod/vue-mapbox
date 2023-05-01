<script setup>
import { onMounted, nextTick, h, render, watch } from 'vue';
import { storeToRefs } from 'pinia';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { usePlotsStore } from './app/usePlotsStore';
import MapPopup from '../components/MapPopup.vue';
const store = usePlotsStore();
const { fetchPlots, fetchAddPlots, addPlot } = store;
const { data } = storeToRefs(store);

onMounted(() => {
  fetchPlots();
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
    },

    defaultMode: 'draw_polygon',
  });
  function loadArea(e) {
    map.addControl(draw);

    map.on('draw.create', createArea);
    map.addSource('plots', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: data.value,
      },
    });
    map.addLayer({
      id: 'plots-layer',
      type: 'fill',
      source: 'plots',
      paint: {
        'fill-color': 'rgba(200, 100, 240, 0.4)',
        'fill-outline-color': 'rgba(200, 100, 240, 1)',
      },
    });
  }
  map.on('contextmenu', 'plots-layer', function (e) {
    const featureId = e.features[0].id;
    console.log(e.features[0].id);
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<div id="map-popup-content"></div>')
      .addTo(map);

    nextTick(() => {
      const popupComp = h(MapPopup, {
        id: featureId,
        onClick: () => {
          deletePlot(134);
          fetchDeletePlots(featureId);
        },
      });

      render(popupComp, document.getElementById('map-popup-content'));
    });
  });
  map.on('mouseenter', 'states-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'states-layer', () => {
    map.getCanvas().style.cursor = '';
  });
  function createArea(e) {
    addPlot(e.features[0]);
    fetchAddPlots(e.features[0]);

    map.getSource('plots').setData({
      type: 'FeatureCollection',
      features: data.value,
    });
    draw.trash();
  }

  map.on('load', loadArea);
});
</script>

<template>
  <div class="main">
    <div id="map"></div>
  </div>
</template>

<style>
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
.mapboxgl-popup {
  width: 200px;
  height: 200px;
  color: black;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>
