<template>
  <div class="text item">
    {{ item.title }}({{ item.amount }}) :{{ price }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
import { Item } from "../types/data";

export default defineComponent({
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

  setup({ rate,item }) {
    const price = computed(() => (rate*item.price).toFixed(2));

    return {
      price,
      item
    };
  }
});
</script>
