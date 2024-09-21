<!-- 总和 -->
<template>
    <div class="bet_total" v-if="open">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="总和"></van-tab>
        </van-tabs>

        <div class="content">
            <div class="tip">选择范围：{{ game.max_number }}个号码总和（不包括特别号码）</div>

            <div class="boxs">
                <div class="box" @click="clickItem(key, val)" v-for="(val, key) in props.config.sum_json" :key="key"
                    :class="{ 'active_box': curr == key }">
                    <span>{{ key }}</span>
                    <span class="val">{{ val }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script setup>
import { ref, computed } from "vue"
import store from "@/store"

const emits = defineEmits(['preBet'])

const open = computed(() => !!(Object.keys(props.config.sum_json).length))

const game = computed(() => store.state.currGame || {})
const props = defineProps({
    numbers: {
        type: Array,
        default: () => []
    },
    config: {
        type: Object,
        default: () => { }
    },
    bigNum: {
        type: Number,
        default: 0
    }
})

const active = ref(0)
const curr = ref('')
const clickItem = (key, val) => {
    if (curr.value == key) { // 清空
        curr.value = ''
        emits('preBet', {})
    } else { // 下注
        curr.value = key
        emits('preBet', {
            code: 20,
            key: key,
            p: val
        })
    }
}

const clear = () => {
    curr.value = ''
}
defineExpose({
    clear
})
</script>

<style lang="less" scoped>
.bet_total {
    .content {
        padding: 4rem 0;

        .tip {
            margin-bottom: 2rem;
        }

        .boxs {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex-wrap: wrap;

            .box {
                width: 50%;
                height: 12rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;

                &:nth-child(2n) {
                    border-right: none;
                }

                .val {
                    margin-left: 2rem;
                    color: #d8bc00;
                    font-weight: bold;
                }
            }

            .active_box {
                background-color: #666;
                color: #eee;
            }
        }
    }
}
</style>