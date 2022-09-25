<template>
  <div class="pagination-wrap">
    <div class="page-container">
      <div
        class="page-btn"
        @click="handlerClickPageBtn(1)"
      >
        first
      </div>
      <template v-if="totalPage === 1">
        <div
          class="page-btn active"
          @click="handlerClickPageBtn(1)"
        >
          1
        </div>
      </template>
      <template v-if="totalPage > 1 && totalPage <= 10">
        <div
          v-for="index in totalPage"
          :key="index"
          class="page-btn"
          :class="{active: index === modelValue}"
          @click="handlerClickPageBtn(index)"
        >
          {{ index }}
        </div>
      </template>
      <template v-if="totalPage > 10">
        <div v-if="showFirstPageBtnIndex > 1">
          ...
        </div>
        <div
          class="page-btn"
          :class="{active: showFirstPageBtnIndex === modelValue}"
          @click="handlerClickPageBtn(showFirstPageBtnIndex)"
        >
          {{ showFirstPageBtnIndex }}
        </div>
        <template v-for="index in (showBtnNum - 1)">
          <div
            v-if="(index + showFirstPageBtnIndex) <= totalPage"
            :key="`${index}-page3`"
            class="page-btn"
            :class="{active: modelValue === index + showFirstPageBtnIndex}"
            @click="handlerClickPageBtn(index + showFirstPageBtnIndex)"
          >
            {{ index + showFirstPageBtnIndex }}
          </div>
        </template>
        <div v-if="(showBtnNum + showFirstPageBtnIndex - 1) < totalPage">
          ...
        </div>
      </template>
      <div
        class="page-btn"
        @click="handlerClickPageBtn(totalPage)"
      >
        end
      </div>
      <div class="page-btn">
        <input
          v-model.number="inputVal"
          class="page-input"
          placeholder="page"
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineExpose, defineEmits } from "@vue/runtime-core";
import type { PropType } from "@vue/runtime-core";
import { ref, computed, watch } from "vue";

const props = defineProps({
    total: {
        type: Number as PropType<number>,
        default: 0
    },
    pageSize: {
        type: Number as PropType<number>,
        default: 6
    },
    modelValue: {
        type: Number as PropType<number>,
        required: true
    }
});

const totalPage = computed<number>(() => Math.ceil(props.total / props.pageSize));
const showBtnNum = ref(9);
const showBtnRadio = ref(parseInt(`${showBtnNum.value / 2}`, 10));

const showFirstPageBtnIndex = computed<number>(() => {
    if (props.modelValue - showBtnRadio.value >= 1) {
        if (props.modelValue + showBtnRadio.value <= totalPage.value) {
            return props.modelValue - showBtnRadio.value;
        }
        return totalPage.value - showBtnNum.value + 1;
    }
    return 1;
});


const emit = defineEmits(["update:modelValue"]);
const handlerClickPageBtn = (index: number) => {
    emit("update:modelValue", index);
};

const inputVal = ref<number>();

watch(inputVal, (val?: number) => {
    if (typeof val !== "number") {
        return;
    }
    if (val > totalPage.value) {
        inputVal.value = totalPage.value;
    } else if (val < 1) {
        inputVal.value = 1;
    }
    emit("update:modelValue", val);
});

defineExpose({
    totalPage,
    showFirstPageBtnIndex,
    showBtnNum,
    inputVal,
    handlerClickPageBtn
});

</script>
<style lang="scss" scoped>
.pagination-wrap {
    .page-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .page-btn {
            color: rgb(37, 37, 160);
            background: #fff;
            font-size: 10px;
            margin: 5px;
            border: 1px solid #cccccc;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5px;
            min-width: 20px;
            border-radius: 4px;
            cursor: pointer;

            &.active {
                color: #fff;
                background: rgb(37, 37, 160);
            }

            .page-input {
                width: 30px;
                outline: none;
                border: none;
            }
        }
    }
}
</style>