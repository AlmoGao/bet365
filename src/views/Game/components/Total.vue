<!-- 总和 -->
<template>
    <div class="bet_total">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="总和"></van-tab>
        </van-tabs>

        <div class="content">
            <div class="tip">选择范围：6个号码总和（不包括特别号码）</div>

            <div class="boxs">
                <div class="box" v-for="i in 10" :class="{ 'active_box': i == 5 }">
                    <span>21 - 74</span>
                    <span class="val">82.00</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const active = ref(0)
</script>

<style lang="less" scoped>
.bet_total {
    .content {
        padding: 4rem 0;

        .tip {
            margin-bottom: 2rem;
        }

        .boxs {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex-wrap: wrap;

            .box {
                width: 50%;
                height: 12rem;
                display: flex;
                align-items: center;
                justify-content: center;

                .val {
                    margin-left: 1rem;
                    color: #ffde00;
                }
            }

            .active_box {
                background-color: #666;
                color: #eee;
            }
        }
    }
}
</style>