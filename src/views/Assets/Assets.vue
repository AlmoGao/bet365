<!-- 资产 -->
<template>
    <div class="page-assets">
        <!-- <van-tabs shrink v-model:active="activeTab">
            <van-tab :title="_t('t110')"></van-tab>
        </van-tabs> -->

        <div class="top">
            <div class="title">
                <span>{{ _t('t111') }}</span>

                <van-icon @click="show = false" v-show="show" class="icon" name="eye-o" />
                <van-icon @click="show = true" v-show="!show" class="icon" name="closed-eye" />

                <!-- <van-icon class="icon" name="replay" /> -->
            </div>

            <div class="num">{{ show ? (config.currency || '') + ' ' + userInfo.money : '******' }}</div>


        </div>

        <div class="top" style="border-top: none">
            <div class="navs">
                <div class="nav" @click="jump('activity')">
                    <img src="@/assets/assets/gift.png" alt="img">
                    <div>{{ _t('27') }}</div>
                </div>
                <div class="nav" @click="jump('hisory')">
                    <img src="@/assets/my/nav1.jpeg" alt="img">
                    <div>{{ _t('3') }}</div>
                </div>
            </div>
        </div>

        <div class="top" style="border-top: none">
            <div class="navs2">
                <div class="nav" @click="jumpLink">
                    <img src="@/assets/assets/nav-1.svg" alt="img">
                    <div class="info">{{ _t('11') }}</div>
                    <van-icon name="arrow" />
                </div>
                <div class="nav" @click="jump('withdraw')">
                    <img src="@/assets/assets/nav-2.svg" alt="img">
                    <div class="info">{{ _t('t113') }}</div>
                    <van-icon name="arrow" />
                </div>
                <div class="nav" @click="jump('rcList')">
                    <img src="@/assets/assets/record.png" alt="img">
                    <div class="info">{{ _t('12') }}</div>
                    <van-icon name="arrow" />
                </div>
                <div class="nav" @click="jump('wdList')">
                    <img src="@/assets/assets/record.png" alt="img">
                    <div class="info">{{ _t('t115') }}</div>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

    </div>


</template>

<script setup>
import { ref, computed } from "vue"
import router from "@/router";
import store from "@/store"
import { _t } from "@/lang/index";
import http from "@/api/index"
store.dispatch('updateUser')
const userInfo = computed(() => store.state.userInfo || {})
const currency = computed(() => store.state.config.currency || 'USDT')
const config = computed(() => store.state.config)

const activeTab = ref(0)
const show = ref(true)



const jumpLink = () => {
    if (!config.value.service_link) return
    window.open(config.value.service_link)
}
const jump = (name) => {
    router.push({ name })
}


</script>

<style lang="less" scoped>
.page-assets {
    padding: 6rem 0 18rem 0;

    .top {
        padding: 8rem 4rem 0 4rem;
        // border-top: 1px solid #e5e5e5;
        // border-bottom: 1px solid #e5e5e5;

        .title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            color: #999;
            font-size: 3.6rem;

            .icon {
                margin-left: 4rem;
            }
        }

        .num {
            line-height: 24rem;
            font-size: 8rem;
            color: #ccc;
            font-weight: 600;
        }

        .navs {
            display: flex;
            align-items: stretch;

            .nav {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    width: 10rem;
                    height: 10rem;
                    margin-bottom: 2rem;
                }
            }
        }

        .navs2 {
            padding: 5rem 0;

            .nav {
                padding: 5rem;
                display: flex;
                align-items: center;

                img {
                    width: 6rem;
                    height: 6rem;
                    margin-right: 4rem;
                }

                .info {
                    flex: 1;
                    font-size: 3.4rem;
                }
            }
        }
    }

    .subtitle {
        font-size: 4rem;
        font-weight: 600;
        color: #fff;
        padding: 4rem 4rem 6rem 4rem;
    }

    .item-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 4rem;
        font-weight: 600;
        margin-bottom: 4rem;
        padding: 0 4rem;

        img {
            width: 5rem;
            height: 5rem;
            margin-right: 1rem;
        }
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 4rem 0 6rem 0;
    }

    .items {
        display: flex;
        align-items: stretch;
        padding: 0 4rem;


        .item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .num {
                color: #fff;
                font-weight: 600;
                margin: 4rem 0;
            }
        }

        .item1 {
            align-items: flex-start;
        }

        .item3 {
            align-items: flex-end;
        }
    }

}
</style>