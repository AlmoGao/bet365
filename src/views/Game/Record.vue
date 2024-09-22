<!-- 结果 -->
<template>
    <div class="bet_his">

        <div class="list">
            <van-loading style="text-align: center;margin-top: 20rem" type="spinner" v-if="loading" />
            <div class="item" v-for="(item, i) in list" :key="i">
                <div class="left">
                    <div>{{ item.lotterytime_text }}</div>
                    <div>{{ item.expect }}</div>
                </div>
                <div class="right">
                    <div class="ball" v-for="(val, key) in getRs(item)" :key="i + '_' + key">{{ val }}</div>
                </div>

                <!-- 总结 -->
                <div class="totals" v-if="game.name == 'bet365'">
                    <div class="total">{{ item.bs }}</div>
                    <div class="total" style="margin-right: 20rem;">{{ item.oe == 1 ? _t('b7') : _t('b8') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import http from "@/api/index"
import { ref, computed } from "vue"
import store from "@/store";
import { _t } from "@/lang/index";

const game = computed(() => store.state.currGame || {})
const list = ref()
const loading = ref(false)
const getList = () => {
    loading.value = true
    http.lottery_results({
        lotto_id: game.value.id
    }).then(res => {
        list.value = (res || []).map((item) => {
            let total = 0
            const obj = getRs(item)
            for (let key in obj) {
                total += obj[key] * 1
            }
            item.oe = total % 2 == 1
            return item
        })
    }).finally(() => {
        loading.value = false
    })
}
getList()

const getRs = item => {
    let obj = {}
    try {
        obj = JSON.parse(item.result_json)
    } catch { }
    return obj
}
</script>

<style lang="less" scoped>
.bet_his {
    .title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 14rem;
    }

    .list {
        .item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 2rem 0;
            border-top: 1px solid #e5e5e5;

            .left {
                margin-right: 4rem;
                font-size: 3rem;
            }

            .right {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .ball {
                    width: 8rem;
                    height: 8rem;
                    color: #000;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: #eee;
                }
            }

            .totals {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: flex-end;
                padding: 2rem 4rem;

                .total {
                    margin: 0 2rem;
                }
            }
        }
    }
}
</style>