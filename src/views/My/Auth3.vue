<!-- 初级认证 -->
<template>
    <div class="page-auth1">
        <Top :title="_t('2')" />


        <!-- <div class="tip">为了保障账户安全体验，请您绑定个人身份信息</div> -->

        <div class="form">
            <div class="subtitle">{{ _t('5') }}：</div>
            <div class="item" v-if="!userInfo.wallet?.address">
                <div class="tab" :class="{ 'active_tab': form.type == 1 }" @click="form.type = 1">Trc20</div>
                <div class="tab" :class="{ 'active_tab': form.type == 2 }" @click="form.type = 2">Erc20</div>
            </div>
            <div class="item" v-if="userInfo.wallet?.address">
                <div class="tab active_tab">{{ userInfo.wallet.type == 1 ? 'Trc20' : 'Erc20' }}</div>
            </div>
            <div class="subtitle">{{ _t('6') }}：</div>
            <div class="item">
                <input v-model="form.address" :type="'text'" :placeholder="_t('ipt')" class="ipt">
            </div>

            <van-button v-if="!userInfo.wallet?.address" class="btn" type="primary" size="large" :loading="loading"
                @click="submit">{{ _t('t56') }}</van-button>
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
    type: userInfo.value.wallet?.type || 1, // 1-trc20 2-erc20
    address: userInfo.value.wallet?.address || '',
})

const loading = ref(false)
const submit = () => {
    if (!form.value.address) return showToast(_t("7"))
    if (loading.value) return
    loading.value = true
    http.bindWallet(form.value).then(res => {
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
            color: #8475f9;
            font-weight: bold;
        }
    }
}
</style>