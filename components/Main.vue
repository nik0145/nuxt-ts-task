<template>
  <div class="container" v-loading="isLoading">
    <el-collapse accordion>
      <el-collapse-item v-for="item in data" :key="item.id">
        <template slot="title">
          {{ item.nameGroup }}
        </template>
        <Item
          v-for="item in item.items"
          @add="onAddItemBasket(item)"
          :key="item.id"
          :item="item"
          :rate="rate"
        />
      </el-collapse-item>
    </el-collapse>
    <ShoppingBasket :items="basketItems" @change-count="changeCount" @delete="onDeleteItemBasket" />
    <pre>{{basketItems}}</pre>
  </div>
</template>

<script lang="ts">
import DataService from "@/services/DataService";
import { defineComponent, onMounted, ref } from "@vue/composition-api";
import { Names } from "@/types/names";
import { Data, DataConvert, Item } from "@/types/data";
export default defineComponent({
  setup() {
    const nameProduct = "Goods";
    const dollarRate = 74.08;

    const data = ref({});
    let basketItems = ref<any[]>([]);
    const onAddItemBasket = (item: any) => {
      basketItems.value.push({...item,count:1});
    };
    const changeCount = (index:any,item: any) => {
      console.log('item',item)
      basketItems.value[index].count = item
    };
    const onDeleteItemBasket = (id: number) => {
      basketItems.value = basketItems.value.filter((item: { id: number; }) =>  item.id !== id)
    };
    const isLoading = ref(true);
    onMounted(async () => {
      setTimeout(async () => {
        try {
          const { Success, Error, Value } = await DataService.getData();
          if (Success) {
            const names: Names[] = await DataService.getNames();
            const convertDataReducer = (acc: DataConvert[], itemData: Item) => {
              const { C: price, P: amount, G: id, T: ItemId } = itemData;
              const { G: nameGroup, B: itemsName } = names[id];
              //? хз нужно ли все остальное, но не зря же эти поля существуют
              const itemGroup = {
                ...itemData,
                title: itemsName[ItemId].N,
                id: ItemId,
                amount,
                price
              };
              if (acc[id]) {
                acc[id].items.push(itemGroup);
              } else {
                acc[id] = {
                  nameGroup,
                  id,
                  items: [itemGroup]
                };
              }
              return acc;
            };
            data.value = Value[nameProduct].reduce(convertDataReducer, {});
          } else {
            throw Error;
          }
        } catch (e) {
          //TODO обработать ошибку
          console.log(e);
        } finally {
          isLoading.value = false;
        }
      }, 900);
    });

    return {
      isLoading,
      changeCount,
      onAddItemBasket,
      onDeleteItemBasket,
      basketItems,
      rate: dollarRate,
      data
    };
  }
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
