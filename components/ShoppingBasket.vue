<template>
  <div>
    <el-table :data="items" border style="width: 100%">
      <el-table-column prop="title" label="Наименование товара и описание">
      </el-table-column>
      <el-table-column prop="amount" label="Количество" width="200">
        <template slot-scope="scope">
          <!-- //? вместо scope.$index лучще использовать id, но для удобства просто отправлю index в массиве -->
          <!-- //? вместо v-model value чтобы не мутировать пропс -->
          <el-input-number
            :value="scope.row.count"
            :min="1"
            @change="e => $emit('change-count', scope.$index, e)"
            :max="scope.row.amount"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Цена" width="160">
        <template slot-scope="scope">
          <span>{{ (scope.row.price * rate).toFixed(2) }} руб. / шт</span>
        </template></el-table-column
      >
      <el-table-column fixed="right" label="" width="60">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="$emit('delete', scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="total">Общая стоимость: {{ totalCost }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "@vue/composition-api";

export default defineComponent({
  emits: ["delete", "change-count"],
  props: {
    items: {
      type: Array,
      required: true
    },
    rate: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const { items, rate } = toRefs(props);
    const totalCost = computed(() =>
      items.value
        .reduce((total: number, i: any) => {
          return total + i.price * i.count * rate.value;
        }, 0)
        .toFixed(2)
    );
    return {
      totalCost
    };
  }
});
</script>
<style>
.total {
  margin-top: 10px;
  text-align: right;
}
</style>
