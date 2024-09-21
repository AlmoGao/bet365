<!-- 充值记录 -->
<template>
    <div class="page-rc_list">
        <Top :title="_t('17')" />

        <!-- <van-tabs v-model:active="activeTab" animated>
            <van-tab title="全部" name="all">
            </van-tab>
            <van-tab title="审核" name="0">
            </van-tab>
            <van-tab title="成功" name="1">
            </van-tab>
            <van-tab title="失败" name="2">
            </van-tab>
        </van-tabs> -->

        <div class="list" v-for="(item, i) in list" :key="i">
            <div class="item">
                <!-- <div class="top">
                    <img class="icon" v-if="item.image" :src="item.image" alt="img">
                    <div class="info"></div>
                    <van-icon name="arrow" />
                </div> -->
                <div class="item_box">
                    <span>{{ _t('13') }}</span>
                    <span class="num">+{{ item.money || '--' }}</span>
                </div>
                <div class="item_box">
                    <span>{{ _t('18') }}</span>
                    <span>{{ parseTime(item.createtime) }}</span>
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
import { _t } from "@/lang/index";



const list = ref([])
const getList = () => {
    http.rechargeList().then(res => {
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