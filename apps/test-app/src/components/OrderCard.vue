<template>
  <div class="card-wrap">
    <div class="card-header">
      <div>
        orderId: {{ data.id }}
      </div>
      <div>
        STATE: {{ data.event_name }}
      </div>
    </div>
    <div class="card-body">
      <div class="card-title">
        {{ data.item }}
      </div>
      <div>
        {{ data.destination }}
      </div>
    </div>
    <div class="card-footer">
      <div>
        {{ data.customer }}
      </div>
      <div>
        ￥{{ data.price }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup >
import { defineProps, defineExpose } from "@vue/runtime-core";
import type { PropType } from "@vue/runtime-core";
import { IOrderItem } from "test-pkg/typing/inter/IOrderStore.d";

const props = defineProps({
    data: {
        type: Object as PropType<IOrderItem>,
        required: true
    }
});

defineExpose({
    data: props.data
});

</script>
<style lang="scss" scoped>
.card-wrap {
    border: 1px solid #cccccc;
    color: #000;
    box-shadow: 1px 2px 5px 1px #cccccc;
    width: 400px;
    border-radius: 8px;
    box-sizing: border-box;

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        border-bottom: 1px solid #cccccc;
        font-size: 12px;
    }

    .card-body {
        padding: 10px 10px;
        font-size: 12px;
        word-break: break-all;

        .card-title {
            font-size: 16px;
            padding-bottom: 10px;
        }
    }

    .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        border-top: 1px solid #cccccc;
        font-size: 12px;
    }
}
</style>