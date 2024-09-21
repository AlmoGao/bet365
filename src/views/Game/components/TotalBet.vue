<!-- 总和-大小单双 -->
<template>
    <div class="bet_total">
        <van-tabs v-model:active="active" shrink>
            <van-tab title="总和-大小单双"></van-tab>
        </van-tabs>

        <div class="content">
            <div class="tip">开奖号码总和的大小和单双</div>

            <div class="boxs">
                <div class="box" @click="clickItem('大', other_json['大'])">
                    <span>{{ _t('b3') }}</span>
                    <span class="val">{{ other_json['大'] }}</span>
                </div>
                <div class="box" @click="clickItem('小', other_json['小'])">
                    <span>{{ _t('b4') }}</span>
                    <span class="val">{{ other_json['小'] }}</span>
                </div>
                <div class="box" @click="clickItem('单', other_json['单'])">
                    <span>{{ _t('b7') }}</span>
                    <span class="val">{{ other_json['单'] }}</span>
                </div>
                <div class="box" @click="clickItem('双', other_json['双'])">
                    <span>{{ _t('b8') }}</span>
                    <span class="val">{{ other_json['双'] }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import store from "@/store"
import { _t } from "@/lang/index";

const emits = defineEmits(['preBet'])

const other_json = computed(() => props.config?.other_json || {})

const game = computed(() => store.state.currGame || {})
const props = defineProps({
    numbers: {
        type: Array,
        default: () => []
    },
    config: {
        type: Object,
        default: () => { }
    },
    bigNum: {
        type: Number,
        default: 0
    }
})

const active = ref(0)
const clickItem = (key, val) => {
    emits('preBet', {
        code: 29,
        key: key,
        p: val
    })
}

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
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;

                &:nth-child(2n) {
                    border-right: none;
                }

                .val {
                    margin-left: 2rem;
                    color: #d8bc00;
                    font-weight: bold;
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