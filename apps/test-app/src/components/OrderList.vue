<template>
  <div class="list-wrap">
    <div class="list-container">
      <div
        v-for="item in list"
        :key="item.id + item.event_name"
        class="item-container"
      >
        <order-card :data="item" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup >
import { defineProps, defineExpose } from "@vue/runtime-core";
import type { PropType } from "@vue/runtime-core";
import { IOrderItem } from "test-pkg/typing/inter/IOrderStore.d";
import OrderCard from "@comp/OrderCard.vue";

const props = defineProps({
    list: {
        type: Object as PropType<Array<IOrderItem>>,
        required: true
    }
});

defineExpose({
    list: props.list
});

</script>
  <style lang="scss" scoped>
  .list-wrap {
    width: 840px;
    .list-container {
        display: flex;
        flex-wrap: wrap;
        .item-container {
            margin: 10px;
        }
    }
  }
  </style>