<!-- 初级认证 -->
<template>
    <div class="page-auth1">
        <Top :title="'提现'" />


        <div class="tip">余额：{{ userInfo.money }}</div>

        <div class="form">
            <div class="subtitle">类型：</div>
            <div class="item">
                <div class="tab" :class="{ 'active_tab': form.type == 1 }" @click="form.type = 1">银行卡</div>
                <div class="tab" :class="{ 'active_tab': form.type == 2 }" @click="form.type = 2">钱包</div>
            </div>
            <div class="item">
                {{ form.type == 1 ? ((userInfo.bank?.bank_name || '') + ' ' + (userInfo.bank?.bank_card || '')) :
                    ((userInfo.wallet?.type == 1 ? 'TRC20' : (userInfo.wallet?.type == 2 ? 'ERC20' : '')) + ' ' +
                        (userInfo.wallet?.address || '')) }}
            </div>
            <div class="subtitle">金额：</div>
            <div class="item">
                <input v-model="form.amount" :type="'number'" :placeholder="_t('ipt')" class="ipt">
            </div>

            <van-button class="btn" type="primary" size="large" :loading="loading" @click="submit">{{ _t('t56')
                }}</van-button>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import http from "@/api"
import { ref, computed } from "vue"
import { showToast } from "vant"
import store from "@/store"
import { _t } from "@/lang/index";
import router from '@/router';

const userInfo = computed(() => store.state.userInfo || {})
store.dispatch('updateUser')

const form = ref({
    type: 1, // 1-银行卡 2-钱包
    amount: '',
})

const loading = ref(false)
const submit = () => {
    if (!form.value.amount) return showToast('请输入金额')
    if (form.value.type == 1 && !userInfo.value.bank?.bank_name) {
        showToast('请先绑定银行卡')
        setTimeout(() => {
            router.push({
                name: 'auth1'
            })
        }, 500)
        return
    }
    if (form.value.type == 2 && !userInfo.value.wallet?.address) {
        showToast('请先绑定钱包')
        setTimeout(() => {
            router.push({
                name: 'auth3'
            })
        }, 500)
        return
    }
    if (loading.value) return
    loading.value = true
    http.withdraw({
        ...form.value,
        ba_id: form.value.type == 1 ? userInfo.value.bank.id : userInfo.value.wallet.id
    }).then(res => {
        if (res.code == 1) {
            showToast(_t("t60"))
            router.back()
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style lang="less" scoped>
.page-auth1 {
    padding-top: 20rem;

    .tip {
        padding: 8rem 4rem;
        color: #d62548;
    }

    .item {
        display: flex;
        align-items: center;

        .tab {
            flex: 1;
            font-size: 5rem;
            color: #999;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .active_tab {
            color: #4936DF;
            font-weight: bold;
        }
    }
}
</style>