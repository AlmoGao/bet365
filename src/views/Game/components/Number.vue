<!-- 数字 -->
<template>
    <div class="bet_number">

        <span class="per_btn" @click="show = true">赔付</span>

        <van-tabs @change="changeTab" v-model:active="active" shrink>
            <van-tab :title="game.name == 'bet365' ? '5球抽奖' : '单式投注'" name="a">
                <div class="number_box">
                    <div class="tip">
                        <span>选择最多{{ game.max_number }}个号码</span>
                        <div class="random" @click="randomNumber(9)">随机选择</div>
                    </div>

                    <div class="numbers">
                        <div @click="clickItem(i, 9)" class="number"
                            :style="{ border: `1px solid ${getColor(i)}`, backgroundColor: bets.includes(i) ? getColor(i) : '' }"
                            v-for="i in props.numbers">
                            {{ i }}</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="组合投注" name="b" v-if="game.name != 'bet365' && open2">
                <div class="number_box">
                    <div class="tip">
                        <span>选择最多14个号码</span>
                        <div class="random" @click="randomNumber(14)">随机选择</div>
                    </div>

                    <div class="numbers">
                        <div @click="clickItem(i, 14)" class="number"
                            :style="{ border: `1px solid ${getColor(i)}`, backgroundColor: bets.includes(i) ? getColor(i) : '' }"
                            v-for="i in props.numbers">
                            {{ i }}</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="第1个号码" name="c" v-if="open3">
                <div class="number_box">
                    <div class="tip">
                        <span>选择第一个抽出的号码</span>
                        <!-- <div class="random">随机选择</div> -->
                    </div>

                    <div class="numbers">
                        <div @click="clickItem(i, 10)" class="number"
                            :style="{ border: `1px solid ${getColor(i)}`, backgroundColor: bets.includes(i) ? getColor(i) : '' }"
                            v-for="i in props.numbers">
                            {{ i }}</div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="特别号码" name="d" v-if="open4">
                <div class="number_box">
                    <div class="tip">
                        <span>选择特别号码</span>
                    </div>

                    <div class="numbers">
                        <div @click="clickItem(i, 15)" class="number"
                            :style="{ border: `1px solid ${getColor(i)}`, backgroundColor: bets.includes(i) ? getColor(i) : '' }"
                            v-for="i in props.numbers">
                            {{ i }}</div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>

    </div>


    <!-- 赔率提示 -->
    <van-overlay z-index="100" teleport="body" :show="show">
        <div class="bet_wrapper" @click="show = false">
            <!-- 365 -->
            <div class="table" @click.stop v-if="game.name == 'bet365'">
                <div class="block">
                    <div class="title">选5球</div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['5-5'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['5-4'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['5-3'] || '--' }}</div>
                    </div>
                </div>
                <div class="block">
                    <div class="title">选4球</div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['4-4'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['4-3'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['4-2'] || '--' }}</div>
                    </div>
                </div>
                <div class="block">
                    <div class="title">选3球</div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['3-3'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['3-2'] || '--' }}</div>
                    </div>
                </div>
                <div class="block">
                    <div class="title">选2球</div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['2-2'] || '--' }}</div>
                    </div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <img class="icon" src="@/assets/error.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['2-1'] || '--' }}</div>
                    </div>
                </div>
                <div class="block">
                    <div class="title">选1球</div>
                    <div class="row">
                        <img class="icon" src="@/assets/ok.svg" alt="ok">
                        <div style="flex: 1;"></div>
                        <div class="amount">{{ props.config.single_json['1-1'] || '--' }}</div>
                    </div>
                </div>
            </div>
            <!-- 非365 -->
            <div class="table" @click.stop v-else>
                <div class="tr th">
                    <div class="td">选项</div>
                    <div class="td">{{ game.max_number + 1 }}个已摇出</div>
                    <div class="td">
                        <div>{{ game.max_number + 2 }}个已摇出</div>
                        <div class="tip">包括特别号码</div>
                    </div>
                </div>
                <div class="tr" v-for="(val, key) in props.config.single_json" :key="key">
                    <div class="td">{{ key }}</div>
                    <div class="td color_td">{{ val }}</div>
                    <div class="td color_td">{{ props.config.special_json[key] || '--' }}</div>
                </div>
            </div>
        </div>
    </van-overlay>
</template>

<script setup>
import { ref, computed } from "vue"
import { colorMap } from "../map"
import store from "@/store"

const open2 = computed(() => props.config.special_json && props.config.special_json[1])
const open3 = computed(() => !!(props.config.other_json.first_numebr))
const open4 = computed(() => !!(props.config.other_json.special_number))

const emits = defineEmits(['preBet'])
const show = ref(false)
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

const getColor = (num) => {
    let color = 'grey'
    for (let key in props.config.number_json) {
        if (props.config.number_json[key].includes(num)) {
            color = key
        }
    }
    return colorMap[color]
}

const active = ref('a')
const changeTab = () => {
    bets.value = []
    emits('preBet', {})
}
const bets = ref([])
const clickItem = (i, key) => {
    if (key == 14) { // 组合
        if (bets.value.includes(i)) {
            bets.value = bets.value.filter(a => a != i)
        } else {
            if (bets.value.length >= 14) return
            bets.value.push(i)
        }
        if (bets.value.length) {
            let p = 1
            let length = bets.value.length > 5 ? 5 : bets.value.length
            if (game.value.name == 'bet365') { // 365
                const key = `${length}-${length}`
                p = props.config.single_json[key]
            } else { // 其他
                const key = length
                const arr = props.config.single_json[key].split('/')
                p = (Number(arr[0]) + Number(arr[1])) / Number(arr[1])
            }

            emits('preBet', {
                code: key,
                key: bets.value,
                p: p
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 9) { // 单式
        if (bets.value.includes(i)) {
            bets.value = bets.value.filter(a => a != i)
        } else {
            if (bets.value.length >= game.value.max_number) return
            bets.value.push(i)
        }

        if (bets.value.length) {
            let p = 1
            let p2 = 1
            if (game.value.name == 'bet365') { // 365
                const key = `${bets.value.length}-${bets.value.length}`
                p = props.config.single_json[key]
            } else { // 其他
                const key = bets.value.length
                const arr = props.config.single_json[key].split('/')
                p = (Number(arr[0]) + Number(arr[1])) / Number(arr[1])
                if (props.config.special_json && props.config.special_json[key]) {
                    const arr2 = props.config.special_json[key].split('/')
                    p2 = (Number(arr2[0]) + Number(arr2[1])) / Number(arr2[1])
                }
            }

            emits('preBet', {
                code: key,
                key: bets.value,
                p: p,
                p2: p2,
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 10) { // 第一个号码
        if (bets.value.includes(i)) {
            bets.value = bets.value.filter(a => a != i)
        } else {
            if (bets.value.length >= 19) return
            bets.value.push(i)
        }

        if (bets.value.length) {
            emits('preBet', {
                code: key,
                key: bets.value,
                p: props.config.other_json.first_numebr
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 15) { // 特别号码
        if (bets.value.includes(i)) {
            bets.value = bets.value.filter(a => a != i)
        } else {
            if (bets.value.length >= 19) return
            bets.value.push(i)
        }

        if (bets.value.length) {
            emits('preBet', {
                code: key,
                key: bets.value,
                p: props.config.other_json.special_number
            })
        } else {
            emits('preBet', {})
        }
    }
}
// 随机
const randomNumber = key => {
    bets.value = []
    if (key == 14) { // 组合
        const arr = getRandomIndexes(props.numbers.length, 14)
        arr.forEach(item => {
            clickItem((item + 1).toString(), 14)
        })
    }
    if (key == 9) { // 单式
        const arr = getRandomIndexes(props.numbers.length, game.value.max_number)
        arr.forEach(item => {
            clickItem((item + 1).toString(), 9)
        })
    }
}

function getRandomIndexes(maxLength, count) {
    // 生成 0 到 maxLength-1 的数组
    const indexes = Array.from({ length: maxLength }, (_, i) => i);
    // Fisher-Yates 洗牌算法打乱数组
    for (let i = maxLength - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[randomIndex]] = [indexes[randomIndex], indexes[i]];
    }
    // 返回打乱后的数组的前 count 个元素
    return indexes.slice(0, count);
}

const clear = () => {
    bets.value = []
}
defineExpose({
    clear
})
</script>


<style lang="less" scoped>
.bet_number {
    position: relative;

    .per_btn {
        position: absolute;
        right: 2rem;
        top: 3.5rem;
        z-index: 99;
        color: chocolate;
    }

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
    }
}
</style>

<style lang="less">
.bet_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .block {
        padding-top: 2rem;
        padding-bottom: 2rem;
        font-weight: bold;
        min-width: 70vw;
        border-bottom: 1px solid #ccc;

        .title {
            margin-bottom: 4rem;
        }

        .row {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;

            .icon {
                width: 6rem;
                height: 6rem;
                margin-right: 1rem;
            }

            .amount {
                color: #146E51;
            }
        }

    }

    .table {
        padding: 4rem;
        border-radius: 2rem;
        background-color: #E4E4E4;
        display: inline-block;
        font-size: 3.6rem;

        .tr {
            display: flex;
            align-items: center;

            .td {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 2rem 1rem;
                min-width: 25vw;

                .tip {
                    font-weight: 400;
                    font-size: 3rem;
                }
            }

            .color_td {
                font-weight: bold;
                color: #146E51;
                font-size: 4rem;
            }
        }

        .th {
            .td {
                font-weight: bold;
            }
        }
    }
}
</style>