<!-- 充值 -->
<template>
    <div class="page-ac">
        <Top :title="_t('27')" />

        <div v-for="(item, i) in actives" :key="i" @click="openItem(item)">
            <img style="width:100%;height:auto" :src="actives[0].cover_image" alt="cover">
        </div>
    </div>

    <!-- 活动弹窗 -->
    <van-dialog v-model:show="showAd" :title="''" :show-cancel-button="false">
        <div style="max-height: 60vh;overflow-y: auto;">
            <img v-for="(item, i) in activesPics" :key="i" style="width:100%;height:auto" :src="item" alt="cover">
        </div>
    </van-dialog>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { ref, computed } from "vue"
import store from "@/store"
import { _t } from "@/lang/index";
import http from "@/api/index"

const actives = computed(() => store.state.actives || [])

http.activity().then(res => {
    if (res) {
        store.commit('setActives', res)
    }
})

const activesPics = ref([])
const showAd = ref(false)
const openItem = item => {
    activesPics.value = item.content_images.split(',')
    showAd.value = true
}
</script>

<style lang="less" scoped>
.page-ac {
    padding: 16rem 4rem 4rem 4rem;
    height: 100%;
    overflow-y: auto;
}
</style>