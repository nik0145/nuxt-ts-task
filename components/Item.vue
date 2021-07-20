<template>
  <div class="text item item-flex">
    <span class="title">{{ item.title }}({{ item.amount }})</span>

    <div class="action-price">
      <div class="btn-wrap">
         <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$emit('add')"
        circle
      ></el-button>
      </div>
     
      <span class="price"> {{ price }}</span>
    </div>
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
<style>
.price {
  background: #f3f3f3;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.action-price{
  display: flex;
}
.btn-wrap{
  margin-top: 5px;
  margin-right: 5px;
}
.item-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.062);
}
</style>
