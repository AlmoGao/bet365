<!-- 提现记录 -->
<template>
    <div class="page-rc_list">
        <Top :title="'投注记录'" />



        <div class="list" v-for="(item, i) in list" :key="i">
            <div class="item">
                <!-- <div class="top">
                    <img class="icon" v-if="item.image" :src="item.image" alt="img">
                    <div class="info"></div>
                    <van-icon name="arrow" />
                </div> -->
                <div class="item_box">
                    <span>{{ item.expect }}</span>
                    <span>{{ parseTime(item.createtime) }}</span>
                </div>
                <div class="item_box">
                    <span>投注：{{ item.amount }}</span>
                    <span style="flex:1"></span>
                    <span class="num" v-if="item.winning_amount * 1">+{{ item.winning_amount }}</span>
                    <span style="margin-left:4rem">{{ item.status_text }}</span>
                </div>
                <div class="content">
                    <span>{{ typeMap[item.category_id] }} </span>
                    <!-- 总和 -->
                    <div v-if="item.category_id == 20">
                        {{ item.bet_content }}
                    </div>
                    <!-- 奇数/偶  -->
                    <div v-if="[12, 17, 18].includes(item.category_id)"
                        style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div style="margin:0 2rem 1rem 0;" v-for="(item, i) in item.bet_content" :key="i"
                            :style="{ display: item ? 'block' : 'none' }">第{{ i + 1 }} {{ item ==
                                1 ? '奇数' : '偶数' }}</div>
                    </div>
                    <!-- 大小  -->
                    <div v-if="[13, 19].includes(item.category_id)"
                        style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div style="margin:0 2rem 1rem 0;" :style="{ display: item ? 'block' : 'none' }"
                            v-for="(item, i) in item.bet_content" :key="i">第{{ i + 1 }} {{ item ==
                                1 ? ('大') : ('小') }}</div>
                    </div>
                    <!-- 特殊球颜色 -->
                    <div v-if="item.category_id == 16" style="display: flex;align-items: center;">
                        <div :style="{ backgroundColor: colorMap[item.bet_content] || '#999' }"
                            style="width:6rem;height:6rem;border-radius: 50%;margin-left: 4rem;"></div>
                    </div>
                    <!-- 球的颜色 -->
                    <div v-if="[11].includes(item.category_id)"
                        style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div v-for="(item, i) in (item.bet_content.split(','))" :key="i"
                            style="margin:0 2rem 1rem 0;;align-items: center;"
                            :style="{ display: item ? 'flex' : 'none' }">
                            <div>第{{ i + 1 }} </div>
                            <div style="width:4rem;height:4rem;border-radius: 50%;margin:0 1rem"
                                :style="{ backgroundColor: colorMap[item] || '#999' }"></div>
                            <span>{{ colorTextMap[item] }}</span>
                        </div>
                    </div>
                    <!-- 特别号码/第一个号码/单式/组合 -->
                    <div v-if="[15, 10, 9, 14].includes(item.category_id)"
                        style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div :style="{ backgroundColor: '#EEE' }" v-for="(item, i) in (item.bet_content.split(','))"
                            :key="i"
                            style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#111;font-weight: bold;display: flex;">
                            {{ item }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-empty v-if="!list.length" />
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import router from '@/router';
import http from "@/api"
import { parseTime } from "@/tools/utils"
import { colorMap, colorTextMap } from '../Game/map'
import store from '@/store';


const typeMap = computed(() => store.state.typeMap || {})
const list = ref([])
const getList = () => {
    http.betList().then(res => {
        list.value = res || []
    })
}
getList()
</script>

<style lang="less" scoped>
.page-rc_list {
    padding-top: 16rem;

    .list {
        padding: 4rem;

        .item {
            border-top: 1px solid #e5e5e5;
            padding: 4rem 0;

            &:last-child {
                border-bottom: 1px solid #e5e5e5;
            }

            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4rem;

                .icon {
                    width: 6rem;
                    height: 6rem;
                    margin-right: 4rem;
                }

                .info {
                    flex: 1;
                    font-size: 4.2rem;
                }
            }

            .item_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 8rem;

                .num {
                    color: #d50f3a;
                    font-weight: 600;
                    font-size: 4rem;
                }

                .status {
                    font-size: 4rem;
                }
            }
        }
    }
}
</style>