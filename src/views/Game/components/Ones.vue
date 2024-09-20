<!-- 二选一 -->
<template>
    <div class="bet_one">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="单数或双数" name="f" v-if="open1"></van-tab>
            <van-tab title="猜大小" name="s" v-if="open2"></van-tab>
        </van-tabs>

        <div class="content" v-if="active == 'f' && open1">
            <div class="tip">选择某个号码的奇偶数</div>
            <div class="tr" v-for="i in (game.name == 'bet365' ? game.lottery_number : (game.lottery_number - 1))">
                <div class="name">第{{ i }}</div>
                <div class="td" @click="clickItem(val2arr, i - 1, 1, 12)" :class="{ 'active_td': val2arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>单数</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val2arr, i - 1, 2, 12)" :class="{ 'active_td': val2arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>双数</span>
                </div>
            </div>
        </div>
        <div class="content" v-if="active == 's' && open2">
            <div class="tip">选择某个号码高于或低于{{ props.bigNum }}</div>
            <div class="tr" v-for="i in (game.name == 'bet365' ? game.lottery_number : (game.lottery_number - 1))">
                <div class="name">第{{ i }}</div>
                <div class="td" @click="clickItem(val3arr, i - 1, 1, 13)" :class="{ 'active_td': val3arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>正好或高于{{ props.bigNum }}</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val3arr, i - 1, 2, 13)" :class="{ 'active_td': val3arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>低于{{ props.bigNum }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import store from "@/store"


const open1 = computed(() => props.config.oe_json && props.config.oe_json[1])
const open2 = computed(() => props.config.bs_json && props.config.bs_json[1])


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

const active = ref('f')

const val2arr = ref([])
const val3arr = ref([])
for (let i = 0; i < (game.value.name == 'bet365' ? game.value.lottery_number : (game.value.lottery_number - 1)); i++) {
    val2arr.value.push(0)
    val3arr.value.push(0)
}


const clickItem = (arr, i, val, key) => {
    if (arr[i] == val) {
        arr[i] = 0
    } else {
        arr[i] = val
    }

    if (key == 12) { // 奇数和偶数(一个或者多个)
        if (arr.some(a => a)) {
            let p = 0
            arr.forEach(b => {
                if (b) {
                    p += 1
                }
            })
            emits('preBet', {
                code: key,
                key: arr,
                p: props.config.oe_json[p]
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 13) { // 猜大小(一个或者多个)
        if (arr.some(a => a)) {
            let p = 0
            arr.forEach(b => {
                if (b) {
                    p += 1
                }
            })
            emits('preBet', {
                code: key,
                key: arr,
                p: props.config.bs_json[p]
            })
        } else {
            emits('preBet', {})
        }
    }
}

</script>

<style lang="less" scoped>
.bet_one {
    .content {
        padding: 4rem 0;

        .tip {
            margin-bottom: 2rem;
        }

        .tr {
            display: flex;
            align-items: center;

            .name {
                margin-right: 4rem;
            }

            .line {
                width: 1px;
                height: 8rem;
                background-color: #eee;
            }

            .td {
                flex: 1;
                height: 12rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .active_td {
                background-color: #666;
                color: #eee;
            }
        }
    }
}
</style>