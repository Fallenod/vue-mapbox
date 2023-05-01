import { defineStore } from 'pinia';
import axios from 'axios';

export const usePlotsStore = defineStore('plotsStore', {
  state: () => ({
    data: [],
  }),
  getters: {
    featureCollectionData(state) {
      return {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: state.data,
        },
      };
    },
  },
  actions: {
    addPlot(newPlot) {
      this.data.push(newPlot);
    },
    deletePlot(newPlot) {
      this.data = this.data.filter((item) => {
        return item.id !== newPlot;
      });
    },
    async fetchPlots() {
      try {
        const res = await axios.get('http://localhost:1337/api/plots');
        this.data = res.data.data.map((item, index) => {
          return {
            ...item.attributes.item,
            id: item.id,
          };
        });
        console.log('users', this.users);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchAddPlots(plot) {
      try {
        const res = await axios.post('http://localhost:1337/api/plots', {
          data: { item: plot },
        });
      } catch (err) {
        console.error(err);
      }
    },
    async fetchDeletePlots(id) {
      try {
        const res = await axios.delete(`http://localhost:1337/api/plots/${id}`);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchUpdatePlots(id, plot) {
      try {
        const res = await axios.put(`http://localhost:1337/api/plots/${id}`, {
          data: { item: plot },
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
});
