<template>
  <div>
    <h2>Показ данных</h2>

    <div v-if="items" class="content">
      <div class="content-container">
        <div v-for="item in items" :key="item.id" class="content-item">
          <span class="item-title">List {{ item.id }}</span>

          <div class="item-container">
            <div v-for="(element, index) in item.objects" :key="index" class="item-element">
              <template v-if="element.quantity && element.checked">
                <div
                  v-for="(el, idx) in element.quantity"
                  :key="idx"
                  :style="{ background: element.color }"
                  class="element"
                  @click="removeElement(item.id, index)"
                ></div>
              </template>

              <span v-else> Пусто </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 v-else>Нет данных</h3>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';

export default {
  setup() {
    // data
    const store = useSettingsStore();

    // computed
    const items = computed(() => store.items);

    // methods
    const removeElement = (id, parentIdx) => {
      store.items.map((item) => {
        if (item.id === id) {
          item.objects[parentIdx].quantity = item.objects[parentIdx].quantity - 1;
        }
      });
    };

    return {
      items,
      removeElement
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  &-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-item {
    padding: 16px;
    border: 1px solid #252525;
    border-radius: 6px;
  }
}

.item {
  &-title {
    display: block;
    font-size: 18px;
    margin-bottom: 16px;
  }

  &-container {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  &-element {
    display: flex;
    gap: 8px;
  }
}

.element {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
