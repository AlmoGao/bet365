<!-- 我的 -->
<template>
   <div class="page-my">

      <!-- 头部 -->
      <div class="header">
         <img class="avatar" :src="userInfo.avatar || defaultAvatar" alt="img">

         <div class="info">
            <div class="title">
               <span>{{ userInfo.username }}</span>
               <!-- <img class="copy" src="@/assets/my/copy.svg" alt="img"> -->
            </div>
            <div>{{ _t('1') }}：{{ (config.currency || '') + ' ' + userInfo.money }}</div>
            <div>{{ _t('25') }}：{{ userInfo.score }}</div>
            <div>{{ _t('26') }}：{{ userInfo.level || '--' }}</div>
         </div>
      </div>

      <!-- 快捷入口 -->
      <!-- <div class="subtitle">{{ _t('t76') }}</div> -->
      <div class="tabs">
         <!-- <div class="tab" @click="jump('passwordSet')">
            <img src="@/assets/my/tab1.png" alt="img">
            <div>{{ _t('t77') }}</div>
         </div> -->
         <!-- <div class="tab" @click="jump('emailSet')">
            <img src="@/assets/my/tab2.png" alt="img">
            <div>{{ _t('t78') }}</div>
         </div> -->
         <div class="tab" @click="jump('auth1')">
            <img src="@/assets/my/tab3.png" alt="img">
            <div>{{ _t('t79') }}</div>
         </div>
         <div class="tab" @click="jump('auth3')">
            <img src="@/assets/my/tab4.png" alt="img">
            <div>{{ _t('2') }}</div>
         </div>
      </div>
      <!-- 通用 -->
      <div class="subtitle">{{ _t('t81') }}</div>
      <div class="navs">

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

         <div class="nav" @click="jump('hisory')">
            <img src="@/assets/my/nav1.jpeg" alt="img">
            <div class="info">{{ _t('3') }}</div>
            <van-icon name="arrow" />
         </div>
         <!-- <div class="nav" @click="goAuth">
            <img src="@/assets/my/avatar.svg" alt="img">
            <div class="info">{{ _t('t83') }}</div>
            <van-icon name="arrow" />
         </div> -->
         <!-- <div class="nav" @click="jump('safePassword')">
            <img src="@/assets/my/nav3.jpg" alt="img">
            <div class="info">{{ _t('t84') }}</div>
            <van-icon name="arrow" />
         </div> -->
         <!-- <div class="nav">
            <img src="@/assets/my/nav4.jpg" alt="img">
            <div class="info">白皮书</div>
            <van-icon name="arrow" />
         </div> -->
         <!-- <div class="nav" @click="jump('lang')">
            <img src="@/assets/my/nav5.jpg" alt="img">
            <div class="info">{{ _t('lang') }}</div>
            <van-icon name="arrow" />
         </div> -->
         <div class="nav" @click="jumpLink" style="padding-bottom:8rem;border-bottom:1px solid #e5e5e5">
            <img src="@/assets/my/nav6.jpg" alt="img">
            <div class="info">{{ _t('t85') }}</div>
            <van-icon name="arrow" />
         </div>
         <div class="nav" @click="loginout">
            <img src="@/assets/my/nav7.svg" alt="img">
            <div class="info">{{ _t('t86') }}</div>
            <van-icon name="arrow" />
         </div>
      </div>
   </div>
</template>

<script setup>
import router from '@/router';
import { showConfirmDialog, showToast } from 'vant';
import store from '@/store'
import http from '@/api/index'
import { computed } from "vue"
import defaultAvatar from "@/assets/my/avatar.svg"
import { _t } from "@/lang/index";

const userInfo = computed(() => store.state.userInfo || {})
const config = computed(() => store.state.config)

const jumpLink = () => {
   if (!config.value.service_link) return
   window.open(config.value.service_link)
}

store.dispatch('updateUser')
const jump = name => {
   router.push({ name })
}

const goAuth = () => {
   if (userInfo.value.verif) return showToast(_t('t87'))
   jump('auth2')
}

const loginout = () => {
   showConfirmDialog({
      title: '',
      message:
         _t('t88') + '？',
   })
      .then(() => {
         http.logout()
         setTimeout(() => {
            store.commit('setToken', '')
            store.commit('setUserInfo', {})
            router.push({
               name: 'login'
            })
         }, 300);
      })
      .catch(() => { });
}



const goCustomer = () => {
   store.dispatch('goCustomer')
}
</script>

<style lang="less" scoped>
.page-my {
   padding-bottom: 18rem;

   .header {
      padding: 10rem 4rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .avatar {
         width: 14rem;
         height: 14rem;
         margin-right: 3rem;
      }

      .info {
         flex: 1;
         color: #888;

         .title {
            font-size: 5rem;
            font-weight: bold;
            color: #fff;
            display: flex;
            align-items: center;

            .copy {
               width: 4rem;
               height: 4rem;
               margin-left: 2rem;
            }
         }
      }
   }

   .subtitle {
      background-color: #333;
      padding: 3rem 4rem;
   }

   .tabs {
      display: flex;
      align-items: stretch;

      .tab {
         flex: 1;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 4rem 0;

         img {
            width: 8rem;
            height: 8rem;
         }
      }
   }

   .navs {
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
</style>