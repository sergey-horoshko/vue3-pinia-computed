<template>
  <div class="content">
    <Settings />
    <List />
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';

export default {
  setup() {
    const store = useSettingsStore();
    const { getData } = store;

    onMounted(() => {
      getData();
    });

    return {};
  },

  components: {
    Settings: defineAsyncComponent(() => import('./components/settings/Index.vue')),
    List: defineAsyncComponent(() => import('./components/list/Index.vue'))
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 60px;
}
</style>
