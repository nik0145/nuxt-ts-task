<template>
  <div class="text item item-flex">
    <span class="title">{{ item.title }}({{ item.amount }})</span>

    <div class="action-price">
      <div class="btn-wrap">
        <el-button
          type="primary"
          :disabled="isDisabled"
          icon="el-icon-plus"
          @click="$emit('add')"
          circle
        ></el-button>
      </div>

      <span :class="[typeColor, 'price']"> {{ price }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  toRefs,
  ref,
  watch
} from "@vue/composition-api";
import { Item } from "../types/data";

export default defineComponent({
  emits: ["add"],
  props: {
    item: {
      type: Object as () => Item,
      required: true
    },
    basket: {
      type: Array as () => Array<Item>,
      default:[]
    },
    rate: {
      type: Number,
      required: false,
      default: 1
    }
  },

  setup(props) {
    const { rate, item,basket } = toRefs(props);
    const typeColor = ref<String>("");
    const price = computed((): number =>
      Number((rate.value * item.value.price).toFixed(2))
    );
    const isDisabled = computed((): boolean =>
      !!basket.value.filter(i=>i.id===item.value.id).length
    );
    watch(price, (newPrice, oldPrice): void => {
      typeColor.value = newPrice > oldPrice ? "red" : "green";
    });
    return {
      isDisabled,
      price,
      typeColor
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
.red {
  background: red;
}
.green {
  background: green;
}
.action-price {
  display: flex;
}
.btn-wrap {
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
