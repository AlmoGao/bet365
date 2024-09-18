<!-- 球的颜色  -->
<template>
    <div class="bet_ballcolor">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="球的颜色"></van-tab>
        </van-tabs>

        <div class="boxs">
            <div>选择一个或多个球的颜色</div>
            <div class="box">
                <div class="name"></div>
                <div class="box_c" v-for="(val, key) in props.config.number_json" :key="key"
                    :style="{ marginLeft: `${8 - Object.keys(props.config.number_json).length}rem` }">{{ colorTextMap[key]
                    }}
                </div>
            </div>
            <div class="box" v-for="i in game.max_number" :key="i">
                <div class="name">第{{ i }}</div>
                <div class="box_c" v-for="(val, key) in props.config.number_json" :key="key"
                    :style="{ border: `1px solid ${colorMap[key]}`, backgroundColor: curr[i] == key ? colorMap[key] : '', marginLeft: `${8 - Object.keys(props.config.number_json).length}rem` }">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { colorMap, colorTextMap } from "../map"
import store from "@/store"

const game = computed(() => store.state.currGame || {})
const props = defineProps({
    numbers: {
        type: Array,
        default: () => []
    },
    config: {
        type: Object,
        default: () => { }
    }
})

const active = ref(0)
const curr = ref([])
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