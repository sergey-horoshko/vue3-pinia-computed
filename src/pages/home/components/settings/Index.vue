<template>
  <div>
    <h2>Настройки</h2>

    <div v-if="items" class="content">
      <div class="content-container">
        <div v-for="item in items" :key="item.id" class="content-item">
          <span class="item-title">
            <label class="element-label">
              <input
                :checked="item.checked"
                false-value="false"
                true-value="true"
                type="checkbox"
                @change="toggleAllElements($event, item.id)"
              />
              <span>List {{ item.id }}</span>
            </label>
          </span>

          <button class="click" type="button" @click="onClick">Открыть/Закрыть</button>
          <div class="item-container">
            <div v-for="(element, index) in item.objects" :key="index" class="element">
              <div class="element-edit">
                <label class="element-label">
                  <input
                    :checked="element.checked"
                    false-value="false"
                    true-value="true"
                    type="checkbox"
                    @change="toggleElements($event, item.id, index)"
                  />
                  <span>Item - {{ index }}</span>
                </label>
              </div>
              <div class="element-info">
                <input
                  v-maska
                  :data-maska="'##'"
                  :value="element.quantity"
                  type="text"
                  @change="changeCount($event, item.id, index)"
                />
                <input
                  :value="element.color"
                  type="color"
                  @change="changeColor($event, item.id, index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from 'maska';
import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { slideToggle } from '@/utils/helpers.js';

export default {
  setup() {
    // data
    const store = useSettingsStore();

    // computed
    const items = computed(() => {
      return store.items;
    });

    // methods
    const onClick = (e) => {
      slideToggle(e);
      console.log(e);
    };

    const changeCount = (e, id, index) => {
      let count;

      if (e.target.value === '0') {
        count = 1;
      } else {
        count = Number(e.target.value);
      }

      store.items.map((item) => {
        if (item.id === id) {
          item.objects[index].quantity = count;
        }
      });
    };

    const changeColor = (e, id, index) => {
      store.items.map((item) => {
        if (item.id === id) {
          item.objects[index].color = e.target.value;
        }
      });
    };

    const toggleElements = (e, id, index) => {
      store.items.map((item) => {
        if (item.id === id) {
          item.objects[index].checked = e.target.checked;
        }
      });

      check(e.target.checked, id, index);
    };

    const toggleAllElements = (e, id) => {
      store.items.map((item) => {
        if (item.id === id) {
          item.objects.forEach((element) => {
            element.checked = e.target.checked;
          });
        }
      });
    };

    const check = (val, id) => {
      store.items.map((item) => {
        if (item.id === id) {
          item.objects.every((el) => {
            if (el.checked) {
              item.checked = true;
              return false;
            } else {
              item.checked = false;
              return true;
            }
          });
        }
      });
    };

    return {
      items,
      onClick,
      changeCount,
      changeColor,
      toggleElements,
      toggleAllElements,
      check
    };
  },

  directives: {
    maska: vMaska
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
    padding-left: 48px;
    height: 0;
    overflow: hidden;
  }

  &-element {
    display: flex;
    gap: 8px;
  }
}

.element {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-info {
    display: flex;
    gap: 16px;
  }

  &-label {
    width: fit-content;
    display: flex;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }
}

.click {
  cursor: pointer;
  margin-bottom: 16px;
}
</style>
