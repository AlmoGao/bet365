<!-- 球的颜色  -->
<template>
    <div class="bet_ballcolor" v-if="open">
        <van-tabs v-model:active="active" shrink>
            <van-tab :title="_t('bb31')"></van-tab>
        </van-tabs>

        <div class="boxs">
            <div>{{ _t('bb32') }}</div>
            <div class="box">
                <div class="name"></div>
                <div class="box_c" v-for="(val, key) in props.config.number_json" :key="key"
                    :style="{ marginLeft: `${8 - Object.keys(props.config.number_json).length}rem` }">{{
                        colorTextMap[key]
                    }}
                </div>
            </div>
            <div class="box" v-for="i in (game.name == 'bet365' ? game.lottery_number : (game.lottery_number - 1))"
                :key="i">
                <div class="name">{{ _t('10') }}{{ i }}</div>
                <div @click="clickItem(i, key)" class="box_c" v-for="(val, key) in props.config.number_json" :key="key"
                    :style="{ border: `1px solid ${colorMap[key]}`, backgroundColor: curr[i] == key ? colorMap[key] : '', marginLeft: `${8 - Object.keys(props.config.number_json).length}rem` }">
                </div>
            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<script setup>
import { ref, computed } from "vue"
import { colorMap, colorTextMap } from "../map"
import store from "@/store"
import { _t } from "@/lang/index";

const emits = defineEmits(['preBet'])
const open = computed(() => props.config.yanse_json && props.config.yanse_json[1])


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
const curr = ref([])
const clickItem = (i, key) => {
    if (curr.value[i] == key) {
        curr.value[i] = ''
    } else {
        curr.value[i] = key
    }
    if (curr.value.some(a => a)) {
        let p = 0
        curr.value.forEach(item => {
            if (item) p += 1
        })
        emits('preBet', {
            code: 11,
            key: curr.value,
            p: props.config.yanse_json[p]
        })
    } else {
        emits('preBet', {})
    }
}

const clear = () => {
    curr.value = []
}
defineExpose({
    clear
})
</script>

<style lang="less" scoped>
.bet_ballcolor {
    .boxs {
        padding: 4rem 0 4rem 8rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 2rem;

            .name {
                text-align: left;
                width: 8rem;
                flex-shrink: 0;
            }

            .box_c {
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>