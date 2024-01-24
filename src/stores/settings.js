import { acceptHMRUpdate, defineStore } from 'pinia';
import { items } from '@/api/mock.js';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    items: null
  }),

  actions: {
    getData() {
      this.items = items;

      return null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}

export default useSettingsStore;
