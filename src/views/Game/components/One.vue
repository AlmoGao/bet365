<!-- 二选一 -->
<template>
    <div class="bet_one">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="首个摇出号码 奇/偶数"></van-tab>
            <van-tab title="单数或双数"></van-tab>
            <van-tab title="猜大小"></van-tab>
        </van-tabs>

        <div class="content" v-if="active == 0">
            <div class="tip">选择奇数或偶数</div>
            <div class="tr">
                <div class="name">第一</div>
                <div class="td" @click="clickItem(val1arr, 0, 1)" :class="{ 'active_td': val1arr[0] == 1 }">
                    <van-icon name="success" />
                    <span>单数</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val1arr, 0, 2)" :class="{ 'active_td': val1arr[0] == 2 }">
                    <van-icon name="success" />
                    <span>双数</span>
                </div>
            </div>
        </div>
        <div class="content" v-if="active == 1">
            <div class="tip">选择所有号码的奇偶数</div>
            <div class="tr" v-for="i in 6">
                <div class="name">第{{ i }}</div>
                <div class="td" @click="clickItem(val2arr, i - 1, 1)" :class="{ 'active_td': val2arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>单数</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val2arr, i - 1, 2)" :class="{ 'active_td': val2arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>双数</span>
                </div>
            </div>
        </div>
        <div class="content" v-if="active == 2">
            <div class="tip">选择每个号码高于或低于25</div>
            <div class="tr" v-for="i in 6">
                <div class="name">第{{ i }}</div>
                <div class="td" @click="clickItem(val3arr, i - 1, 1)" :class="{ 'active_td': val3arr[i - 1] == 1 }">
                    <van-icon name="success" />
                    <span>单数</span>
                </div>
                <div class="line"></div>
                <div class="td" @click="clickItem(val3arr, i - 1, 2)" :class="{ 'active_td': val3arr[i - 1] == 2 }">
                    <van-icon name="success" />
                    <span>双数</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const active = ref(0)

const val1arr = ref([0])
const val2arr = ref([0, 0, 0, 0, 0, 0])
const val3arr = ref([0, 0, 0, 0, 0, 0])


const clickItem = (arr, i, val) => {
    if (arr[i] == val) {
        arr[i] = 0
    } else {
        arr[i] = val
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