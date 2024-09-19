<!-- 投注页 -->
<template>
    <div class="page-game">
        <Top :title="game.name" />

        <div>
            <van-tabs v-model:active="active" shrink animated>
                <van-tab title="投注盘">
                    <div class="mid"></div>
                    <!-- 号码 -->
                    <Number @preBet="preBet" :numbers="numbers" :config="config" />
                    <div class="mid"></div>
                    <!-- 球得颜色 -->
                    <BallColor @preBet="preBet" :numbers="numbers" :config="config" />
                    <!-- 颜色 -->
                    <Color @preBet="preBet" :numbers="numbers" :config="config" />
                    <div class="mid"></div>
                    <!-- 二选一 不限 -->
                    <Ones @preBet="preBet" :numbers="numbers" :config="config" />
                    <!-- 二选一 -->
                    <One @preBet="preBet" :numbers="numbers" :config="config" />
                    <div class="mid"></div>
                    <!-- 总和  -->
                    <Total @preBet="preBet" :numbers="numbers" :config="config" />
                    <div class="mid"></div>
                    <div class="mid"></div>
                </van-tab>
                <van-tab title="结果">
                    <Record />
                </van-tab>
            </van-tabs>
        </div>
    </div>

    <!-- 预投注 -->
    <div class="pre_bet" v-if="preItem.code">
        <div class="title">
            <van-icon @click="preItem = {}" class="close" name="cross" />
            <div>{{ typeMap[preItem.code] }}</div>
            <div style="flex:1"></div>
            <div>{{ preItem.p }}</div>
        </div>
        <div class="content">
            <div class="bet_info">
                <!-- 总和 -->
                <div v-if="preItem.code == 20">
                    {{ preItem.key }}
                </div>
                <!-- 奇数/偶  -->
                <div v-if="[12, 17, 18].includes(preItem.code)"
                    style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div style="margin:0 2rem 1rem 0;" v-for="(item, i) in preItem.key" :key="i"
                        :style="{ display: item ? 'block' : 'none' }">第{{ i + 1 }} {{ item ==
                            1 ? '奇数' : '偶数' }}</div>
                </div>
                <!-- 大小  -->
                <div v-if="[13, 19].includes(preItem.code)" style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div style="margin:0 2rem 1rem 0;" :style="{ display: item ? 'block' : 'none' }"
                        v-for="(item, i) in preItem.key" :key="i">第{{ i + 1 }} {{ item ==
                            1 ? '25及高于' : '低于25' }}</div>
                </div>
                <!-- 特殊球颜色 -->
                <div v-if="preItem.code == 16" style="display: flex;align-items: center;">
                    <div style="width:8rem;height:8rem;border-radius: 50%;margin-right:2rem"
                        :style="{ backgroundColor: colorMap[preItem.key] }"></div>
                    <span>{{ colorTextMap[preItem.key] }}</span>
                </div>
                <!-- 球的颜色 -->
                <div v-if="[11].includes(preItem.code)" style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div v-for="(item, i) in preItem.key" :key="i" style="margin:0 2rem 1rem 0;;align-items: center;"
                        :style="{ display: item ? 'flex' : 'none' }">
                        <div>第{{ i + 1 }} </div>
                        <div style="width:4rem;height:4rem;border-radius: 50%;margin:0 1rem"
                            :style="{ backgroundColor: colorMap[item] }"></div>
                        <span>{{ colorTextMap[item] }}</span>
                    </div>
                </div>
                <!-- 特别号码/第一个号码/单式/组合 -->
                <div v-if="[10, 15, 14, 21].includes(preItem.code)"
                    style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div :style="{ backgroundColor: getColor(item) }" v-for="(item, i) in preItem.key" :key="i"
                        style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#fff;font-weight: bold;display: flex;">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div class="link">添加至投注单</div>
        </div>
    </div>

    <!-- 投注 -->
    <van-popup v-model:show="showBottom" round position="bottom">
        <div class="bet_dialog">
            <div class="bet_top">
                <div class="option">
                    <div class="num">2</div>
                    <div>选项</div>
                </div>
                <div class="amount">
                    <div>余额</div>
                    <div class="num">0.00</div>
                </div>
                <div class="close"><van-icon name="arrow-down" /></div>
            </div>
            <div class="bet_content">
                <div class="bet_item">
                    <div class="bet_info">
                        <van-icon class="bet_info_delete" name="cross" />
                        <div class="bet_info_name">组合投注</div>
                        <div class="bet_info_per">7.50</div>
                        <div class="bet_ipt_box">
                            <input type="number" class="bet_ipt">
                            <span>本金</span>
                        </div>
                    </div>
                    <div class="bet_nums">
                        <div class="bet_num" v-for="i in 14" :key="i">
                            <div class="ball"></div>
                        </div>
                    </div>
                </div>

                <div class="bet_item">
                    <div class="bet_info">
                        <van-icon class="bet_info_delete" name="cross" />
                        <div class="bet_info_name">组合投注</div>
                        <div class="bet_info_per">7.50</div>
                        <div class="bet_ipt_box">
                            <input type="number" class="bet_ipt">
                            <span>本金</span>
                        </div>
                    </div>
                    <div class="bet_nums">
                        <div class="bet_num" v-for="i in 1" :key="i">
                            <div class="ball"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bet_bottom">投注</div>
        </div>
    </van-popup>
</template>

<script setup>
import Top from "@/components/Top.vue"
import { ref, computed } from "vue"
import { colorMap, colorTextMap } from './map'
import Number from "./components/Number.vue"
import BallColor from "./components/BallColor.vue"
import Color from "./components/Color.vue"
import One from "./components/One.vue"
import Ones from "./components/Ones.vue"
import Total from "./components/Total.vue"
import Record from "./Record.vue"
import http from "@/api/index"
import store from "@/store"


const getColor = (num) => {
    let color = 'grey'
    for (let key in config.value.number_json) {
        if (config.value.number_json[key].includes(num)) {
            color = key
        }
    }
    return colorMap[color]
}


// 预投注
const preItem = ref({})
const preBet = item => { // code: 玩法  key: 投注项  p: 倍率
    preItem.value = item
}
const typeMap = computed(() => store.state.typeMap || {})

const active = ref(0)
const showBottom = ref(false)
const game = computed(() => store.state.currGame || {})

const numbers = ref([])
const config = ref({
    number_json: {}, // 号码和颜色
    oe_json: {}, // 单双赔率
    bs_json: {}, // 大小赔率
    single_json: {}, // 单试
    combination_json: {}, // 组合
    special_json: {}, // 特殊
    sum_json: {}, // 总和
    yanse_json: {}, // 颜色
    other_json: {}, // 其他
})
const getInfo = () => {
    http.game_payout({
        lotto_id: game.value.id
    }).then(res => {
        if (res) {
            if (res.number_json) {
                try {
                    config.value.number_json = JSON.parse(res.number_json)
                    for (let key in config.value.number_json) {
                        config.value.number_json[key] = config.value.number_json[key].split(',')
                        numbers.value.push(...config.value.number_json[key])
                        numbers.value = numbers.value.sort((a, b) => a - b)
                    }
                } catch { }
            }
            if (res.oe_json) {
                try { config.value.oe_json = JSON.parse(res.oe_json) } catch { }
            }
            if (res.bs_json) {
                try { config.value.bs_json = JSON.parse(res.bs_json) } catch { }
            }
            if (res.single_json) {
                try { config.value.single_json = JSON.parse(res.single_json) } catch { }
            }
            if (res.combination_json) {
                try { config.value.combination_json = JSON.parse(res.combination_json) } catch { }
            }
            if (res.special_json) {
                try { config.value.special_json = JSON.parse(res.special_json) } catch { }
            }
            if (res.sum_json) {
                try { config.value.sum_json = JSON.parse(res.sum_json) } catch { }
            }
            if (res.yanse_json) {
                try { config.value.yanse_json = JSON.parse(res.yanse_json) } catch { }
            }
            if (res.other_json) {
                try { config.value.other_json = JSON.parse(res.other_json) } catch { }
            }
        }
        console.error('----->', config.value)
    })
}
getInfo()

</script>

<style lang="less" scoped>
.page-game {
    height: 100%;
    padding: 16rem 3rem 3rem 3rem;

    .mid {
        height: 4rem;
    }
}

.bet_dialog {
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .bet_top {
        display: flex;
        align-items: center;
        height: 12rem;
        padding-left: 4rem;

        .option {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            font-weight: bold;

            .num {
                border-radius: 50%;
                padding: 1rem 2rem;
                background-color: #076B4C;
                color: #fff;
                font-size: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 2rem;
            }
        }

        .amount {
            flex: 1;
            text-align: right;

            .num {
                font-weight: bold;
                color: #000;
                font-size: 4rem;
            }
        }

        .close {
            width: 12rem;
            height: 12rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .bet_bottom {
        height: 12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 4rem;
        background-color: #4936df;
        color: #fff;
    }

    .bet_content {
        flex: 1;
        overflow-y: auto;

        .bet_item {
            padding: 2rem 0;
            border-bottom: 1px solid #eeeeee;

            .bet_info {
                display: flex;
                align-items: center;
                padding: 0 2rem;
                margin-bottom: 2rem;

                .bet_info_delete {
                    font-size: 5rem;
                    margin-right: 2rem;
                }

                .bet_info_name {
                    flex: 1;
                    font-size: 4rem;
                    font-weight: bold;
                }

                .bet_info_per {
                    font-size: 4rem;
                    font-weight: bold;
                    margin-right: 2rem;
                }

                .bet_ipt_box {
                    display: flex;
                    align-items: center;
                    background-color: #eee;
                    height: 10rem;
                    padding: 0 2rem;

                    .bet_ipt {
                        height: 100%;
                        flex: 1;
                        background-color: rgba(0, 0, 0, 0);
                        border: none;
                        width: 20rem;
                    }
                }
            }

            .bet_nums {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding-left: 4rem;
                max-width: 50%;
                flex-wrap: wrap;

                .bet_num {
                    margin: 0 1rem 1rem 0;
                }

                .ball {
                    width: 8rem;
                    height: 8rem;
                    border-radius: 50%;
                    background-color: #eee;
                }
            }
        }
    }
}

.pre_bet {
    position: fixed;
    max-width: 720px;
    width: 90%;
    padding: 2rem 4rem;
    border-radius: 2rem;
    z-index: 999;
    bottom: 6rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #E4E4E4;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;

        .close {
            margin-right: 2rem;
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4rem 0;

        .link {
            color: #076B4C;
            white-space: nowrap;
        }
    }
}
</style>