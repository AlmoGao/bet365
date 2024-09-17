<!-- 投注页 -->
<template>
    <div class="page-game">
        <Top :title="'369'" />

        <div>
            <van-tabs v-model:active="active" shrink animated>
                <van-tab title="投注盘">
                    <div class="mid"></div>
                    <!-- 号码 -->
                    <Number />
                    <div class="mid"></div>
                    <!-- 颜色 -->
                    <Color />
                    <div class="mid"></div>
                    <!-- 二选一 -->
                    <One />
                    <div class="mid"></div>
                    <!-- 总和  -->
                    <Total />
                    <div class="mid"></div>
                    <div class="mid"></div>
                </van-tab>
                <van-tab title="结果">
                    <Record />
                </van-tab>
            </van-tabs>
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
import { ref } from "vue"
import Number from "./components/Number.vue"
import Color from "./components/Color.vue"
import One from "./components/One.vue"
import Total from "./components/Total.vue"
import Record from "./Record.vue"

const active = ref(0)
const showBottom = ref(true)


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
</style>