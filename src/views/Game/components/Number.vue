<!-- 数字 -->
<template>
    <div class="bet_number">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="单式投注"></van-tab>
            <van-tab title="组合投注"></van-tab>
            <van-tab title="第1个号码"></van-tab>
            <van-tab title="特别号码"></van-tab>
        </van-tabs>
        <div class="number_box">
            <div class="tip">
                <span>选择最多5个号码</span>
                <div class="random">随机选择</div>
            </div>

            <div class="numbers">
                <div @click="clickItem(i)" class="number" :class="{ 'active_number': bets.includes(i) }" v-for="i in 49">
                    {{ i }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { colorMap } from "../map"


const active = ref(0)
const bets = ref([])
const clickItem = i => {
    if (bets.value.includes(i)) {
        bets.value = bets.value.filter(a => a != i)
    } else {
        bets.value.push(i)
    }
}
</script>


<style lang="less" scoped>
.bet_number {
    .number_box {
        .tip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 4rem 0;

            .random {
                padding: 1rem 2rem;
                border-radius: 1rem;
                border: 1px solid #999;
            }
        }
    }

    .numbers {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .number {
            width: 12rem;
            height: 12rem;
            border-radius: 50%;
            color: #000;
            font-weight: bold;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .active_number {
            background-color: #eee;
        }
    }
}
</style>