<!-- 特别号码颜色  -->
<template>
    <div class="bet_color">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="特别号码颜色"></van-tab>
        </van-tabs>

        <div class="boxs">
            <div class="box" @click="curr = key" v-for="(val, key) in colorMap" :key="key">
                <div class="box_c" :style="{ border: `1px solid ${val}`, backgroundColor: curr == key ? val : '' }">
                </div>
                <div>{{ colorTextMap[key] }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { colorMap, colorTextMap } from "../map"

const active = ref(0)
const curr = ref('')
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