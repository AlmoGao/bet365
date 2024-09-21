<!-- 特别号码颜色  -->
<template>
    <div class="bet_color" v-if="open">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="特别号码颜色"></van-tab>
        </van-tabs>

        <div class="boxs">
            <div class="box" @click="clickItem(key, val)" v-for="(val, key) in props.config.number_json" :key="key">
                <div class="box_c"
                    :style="{ border: `1px solid ${colorMap[key]}`, backgroundColor: curr == key ? colorMap[key] : '' }">
                </div>
                <div>{{ colorTextMap[key] }}</div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script setup>
import { ref, computed } from "vue"
import { colorMap, colorTextMap } from "../map"
import store from "@/store"

const open = computed(() => props.config.other_json && props.config.other_json.special_number_color)
const emits = defineEmits(['preBet'])

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
const clickItem = (key) => {
    if (curr.value == key) {
        curr.value = ''
        emits('preBet', {})
    } else {
        curr.value = key
        emits('preBet', {
            code: 16,
            key: key,
            p: props.config.other_json.special_number_color
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
.bet_color {
    .boxs {
        padding: 4rem 0 4rem 8rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .box {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 2rem;

            .box_c {
                width: 12rem;
                height: 12rem;
                border-radius: 50%;
                margin-right: 4rem;
            }
        }
    }
}
</style>