<template>
  <div class="text item">
    {{ item.title }}({{ item.amount }}) :{{ price }}
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="$emit('add')"
      circle
    ></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { Item } from "../types/data";

export default defineComponent({
  emits: ["add"],
  props: {
    item: {
      type: Object as () => Item,
      required: true
    },
    rate: {
      type: Number,
      required: false,
      default: 1
    }
  },

  setup({ rate, item }) {
    //*вынести вверх
    const price = computed(() => (rate * item.price).toFixed(2));

    return {
      price
    };
  }
});
</script>
