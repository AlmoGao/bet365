<!-- 二选一 -->
<template>
    <div class="bet_one">
        <van-tabs v-model:active="active" shrink>
            <van-tab :title="_t('bb53')" name="f" v-if="open1"></van-tab>
            <van-tab :title="_t('bb54')" name="s" v-if="open2"></van-tab>
            <van-tab :title="_t('bb55')" name="t" v-if="open3"></van-tab>
        </van-tabs>

        <div class="content" v-if="active == 'f' && open1">
            <div class="tip">{{ _t('bb56') }}</div>
            <div class="tr">
                <div class="name">{{ _t('bb57') }}</div>
                <div class="td" @click="clickItem(val1arr, 0, 1, 17)" :class="{ 'active_td': val1arr[0] == 1 }">
                    <van-icon name="success" />
                    <span>{{ _t('b5') }}</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val1arr, 0, 2, 17)" :class="{ 'active_td': val1arr[0] == 2 }">
                    <van-icon name="success" />
                    <span>{{ _t('b6') }}</span>
                </div>
            </div>
        </div>
        <div class="content" v-if="active == 's' && open2">
            <div class="tip">{{ _t('bb58') }}</div>
            <div class="tr" v-for="i in (game.name == 'bet365' ? game.lottery_number : (game.lottery_number - 1))">
                <div class="name">{{ _t('10') }}{{ i }}</div>
                <div class="td" @click="clickItem(val2arr, i - 1, 1, 18)" :class="{ 'active_td': val2arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>{{ _t('b5') }}</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val2arr, i - 1, 2, 18)" :class="{ 'active_td': val2arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>{{ _t('b6') }}</span>
                </div>
            </div>
        </div>
        <div class="content" v-if="active == 't' && open3">
            <div class="tip">{{ _t('bb59') }}{{ props.bigNum }}</div>
            <div class="tr" v-for="i in (game.name == 'bet365' ? game.lottery_number : (game.lottery_number - 1))">
                <div class="name">{{ _t('10') }}{{ i }}</div>
                <div class="td" @click="clickItem(val3arr, i - 1, 1, 19)" :class="{ 'active_td': val3arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>{{ _t('bb60') }}{{ props.bigNum }}</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val3arr, i - 1, 2, 19)" :class="{ 'active_td': val3arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>{{ _t('bb61') }}{{ props.bigNum }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import store from "@/store"
import { _t } from "@/lang/index";

const open1 = computed(() => !!(props.config.other_json.first_oe))
const open2 = computed(() => !!(props.config.other_json.oe))
const open3 = computed(() => !!(props.config.other_json.bs))


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

const val1arr = ref([0])
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

    if (key == 17) { // 首个奇数/偶
        if (arr[i]) {
            emits('preBet', {
                code: key,
                key: [arr[i]],
                p: props.config.other_json.first_oe.split('/')[arr[i] - 1]
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 18) { // 奇数和偶数(全选)
        if (arr.every(a => a)) {
            emits('preBet', {
                code: key,
                key: arr,
                p: props.config.other_json.oe
            })
        } else {
            emits('preBet', {})
        }
    }
    if (key == 19) { // 猜大小(全选)
        if (arr.every(a => a)) {
            emits('preBet', {
                code: key,
                key: arr,
                p: props.config.other_json.bs
            })
        } else {
            emits('preBet', {})
        }
    }
}

const clear = () => {
    val1arr.value = [0]
    val2arr.value = []
    val3arr.value = []
    for (let i = 0; i < (game.value.name == 'bet365' ? game.value.lottery_number : (game.value.lottery_number - 1)); i++) {
        val2arr.value.push(0)
        val3arr.value.push(0)
    }
}
defineExpose({
    clear
})
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