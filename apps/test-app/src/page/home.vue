<template>
  <div class="page">
    <div class="order-container">
      <input
        v-model.number="searchPrice"
        class="search-input"
        placeholder="search price"
      >
      <div class="page-title">
        total: {{ orderTotal }}
      </div>
      <order-list-comp :list="orderList.list" />
      <div class="page-container">
        <Pagination
          v-model="showPage"
          :total="orderTotal"
          :page-size="pageSize"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { OrderStore } from "test-pkg";
import { IOrderItem } from "test-pkg/typing/inter/IOrderStore.d";
import { reactive, ref, watch } from "vue";
import OrderListComp from "@comp/OrderList.vue";
import Pagination from "@comp/Pagination.vue";

export default {
    setup() {
        const store = new OrderStore();

        const pageSize = ref(6);

        store.setPageSize(pageSize.value);
        store.startBySocketIo("http://localhost:4000");

        const orderList = reactive<{
          list: Array<IOrderItem>
        }>({
            list: []
        });
        const showPage = ref(1);
        const orderTotal = ref(0);
        const searchPrice = ref<number>();

        const update = () => {
            if (typeof searchPrice.value !== "number") {
                const data: Array<IOrderItem> = store.getPage(showPage.value);

                orderList.list = data;
                orderTotal.value = store.getTotalOrderNum();
            } else {
                const data: Array<IOrderItem> = store.getPageByPrice(showPage.value, searchPrice.value);

                orderList.list = data;
                orderTotal.value = store.getPriceOrderNum(searchPrice.value);
            }

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);

        watch(searchPrice, () => {
            showPage.value = 1;
        });

        return {
            orderList,
            showPage,
            orderTotal,
            pageSize,
            searchPrice
        };
    },
    components: {
        OrderListComp,
        Pagination
    }
};
</script>
<style lang="scss" scoped>
  .page {
    padding-top: 80px;

    .order-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .search-input {
        margin-bottom: 20px;
      }

      .page-title {
        padding-bottom: 40px;
      }

      .page-container {
        width: 820px;
        padding-top: 20px;
      }
    }
  }
</style>