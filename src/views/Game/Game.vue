<!-- 投注页 -->
<template>
    <div class="page-game">
        <Top :title="game.name" />

        <div style="position: relative">
            <!-- 期号和倒计时 -->
            <div
                style="position: absolute;z-index: 99;display: flex;align-items: center;right: 4rem;top:4rem;font-weight: bold;">
                <div style="margin-right: 4rem;">{{ currE.expect || '' }}</div>
                <div>{{ timeStr }}</div>
            </div>
            <van-tabs v-model:active="active" shrink animated>
                <van-tab :title="_t('bb10')">
                    <div class="mid"></div>
                    <!-- 号码 -->
                    <Number ref="NumberRef" @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum" />
                    <div class="mid"></div>
                    <!-- 总和 - 大小单双 -->
                    <TotalBet @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum"
                        v-if="game.name == 'bet365'" />
                    <van-loading style="text-align: center;margin-top: 20rem" type="spinner" v-if="infoLoading" />
                    <div class="mid"></div>
                    <!-- 球得颜色 -->
                    <BallColor ref="BallColorRef" @preBet="preBet" :numbers="numbers" :config="config"
                        :bigNum="bigNum" />
                    <!-- 颜色 -->
                    <Color ref="ColorRef" @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum" />
                    <div class="mid"></div>
                    <!-- 二选一 不限 -->
                    <Ones ref="OnesRef" @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum" />
                    <!-- 二选一 -->
                    <One ref="OneRef" @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum" />
                    <div class="mid"></div>
                    <!-- 总和  -->
                    <Total ref="TotalRef" @preBet="preBet" :numbers="numbers" :config="config" :bigNum="bigNum" />
                    <div class="mid"></div>
                    <div class="mid"></div>
                </van-tab>
                <van-tab :title="_t('bb11')">
                    <Record v-if="active == 1" />
                </van-tab>
            </van-tabs>
        </div>
    </div>

    <!-- 预投注 -->
    <div class="pre_bet" v-if="preItem.code">
        <div class="title">
            <van-icon @click="preItem = {}" class="close" name="cross" />
            <div>{{ typeMap[preItem.code] }}</div>
            <div style="flex:1"></div>
            <div>{{ preItem.p }}</div>
        </div>
        <div class="content">
            <div class="bet_info">
                <!-- 总和 -->
                <div v-if="[20, 26].includes(preItem.code)">
                    {{ preItem.key }}
                </div>
                <!-- 奇数/偶  -->
                <div v-if="[12, 17, 18].includes(preItem.code)"
                    style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div style="margin:0 2rem 1rem 0;" v-for="(item, i) in preItem.key" :key="i"
                        :style="{ display: item ? 'block' : 'none' }">{{ _t('10') }}{{ i + 1 }} {{ item ==
                            1 ? _t('b1') : _t('b2') }}</div>
                </div>
                <!-- 大小  -->
                <div v-if="[13, 19].includes(preItem.code)" style="display: flex;flex-wrap: wrap;align-items: center;">
                    <div style="margin:0 2rem 1rem 0;" :style="{ display: item ? 'block' : 'none' }"
                        v-for="(item, i) in preItem.key" :key="i">{{ _t('10') }}{{ i + 1 }} {{ item ==
                            1 ? ('≥' + bigNum) : ('<' + bigNum) }}</div>
                    </div>
                    <!-- 特殊球颜色 -->
                    <div v-if="preItem.code == 16" style="display: flex;align-items: center;">
                        <div style="width:8rem;height:8rem;border-radius: 50%;margin-right:2rem"
                            :style="{ backgroundColor: colorMap[preItem.key] }"></div>
                        <span>{{ colorTextMap()[preItem.key] }}</span>
                    </div>
                    <!-- 球的颜色 -->
                    <div v-if="[11].includes(preItem.code)" style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div v-for="(item, i) in preItem.key" :key="i"
                            style="margin:0 2rem 1rem 0;;align-items: center;"
                            :style="{ display: item ? 'flex' : 'none' }">
                            <div>{{ _t('10') }}{{ i }} </div>
                            <div style="width:4rem;height:4rem;border-radius: 50%;margin:0 1rem"
                                :style="{ backgroundColor: colorMap[item] }"></div>
                            <span>{{ colorTextMap()[item] }}</span>
                        </div>
                    </div>
                    <!-- 特别号码/第一个号码/单式/组合 -->
                    <div v-if="[15, 10, 9, 14].includes(preItem.code)"
                        style="display: flex;flex-wrap: wrap;align-items: center;">
                        <div :style="{ backgroundColor: getColor(item) }" v-for="(item, i) in preItem.key" :key="i"
                            style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#fff;font-weight: bold;display: flex;">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <div class="link" @click="addToList">{{ _t('bb12') }}</div>
            </div>
        </div>

        <!-- 投注图标 -->
        <div class="tip_num" @click="showBottom = true" v-if="betList.length">{{ betList.length }}</div>

        <!-- 投注 -->
        <van-popup v-model:show="showBottom" round position="bottom">
            <div class="bet_dialog">
                <div class="bet_top">
                    <div class="option">
                        <div class="num">2</div>
                        <div>{{ _t('bb13') }}</div>
                    </div>
                    <div class="amount">
                        <div>{{ _t('1') }}</div>
                        <div class="num">{{ pre }}{{ userInfo.money }}</div>
                    </div>
                    <div class="close" @click="showBottom = false"><van-icon name="arrow-down" /></div>
                </div>
                <div class="bet_content">
                    <!-- <div class="bet_item">
                    <div class="bet_info">
                        <van-icon class="bet_info_delete" name="cross" />
                        <div class="bet_info_name">组合投注</div>
                        <div class="bet_info_per">7.50</div>
                        <div class="bet_ipt_box">
                            <span>3X</span>
                            <input type="number" class="bet_ipt" placeholder="本金">
                        </div>
                    </div>
                    <div class="bet_nums">
                        <div class="bet_num" v-for="i in 14" :key="i">
                            <div class="ball"></div>
                        </div>
                    </div>
                </div> -->

                    <!-- <div class="bet_item">
                    <div class="bet_info">
                        <van-icon class="bet_info_delete" name="cross" />
                        <div class="bet_info_name">组合投注</div>
                        <div class="bet_info_per">7.50</div>
                        <div class="bet_ipt_box">
                            <span>3X</span>
                            <input type="number" class="bet_ipt" placeholder="本金">
                        </div>
                    </div>
                    <div class="bet_nums">
                        <div class="bet_num" v-for="i in 1" :key="i">
                            <div class="ball"></div>
                        </div>
                    </div>
                </div> -->

                    <template v-for="(item, i) in betList">
                        <!-- 总和  -->
                        <div class="bet_item" v-if="[20, 26].includes(item.code)">
                            <div class="bet_info">
                                <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                <div class="bet_info_per">{{ item.p }}</div>
                                <div class="bet_ipt_box">
                                    <span></span>
                                    <input type="number" v-model="item.amount" class="bet_ipt"
                                        :placeholder="_t('bb14')">
                                </div>
                            </div>
                            <div style="display: flex;align-items: center;justify-content: space-between;">
                                <div style="padding: 0 4rem">
                                    {{ item.key }}
                                </div>

                                <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                    <div>{{ _t('bb14') }} {{ item.amount }}</div>
                                    <div>{{ _t('bb15') }}</div>
                                    <div>{{ item.amount * item.p }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 奇数/偶  -->
                        <div class="bet_item" v-if="[12, 17, 18].includes(item.code)">
                            <div class="bet_info">
                                <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                <div class="bet_info_per">{{ item.p }}</div>
                                <div class="bet_ipt_box">
                                    <span></span>
                                    <input type="number" v-model="item.amount" class="bet_ipt"
                                        :placeholder="_t('bb14')">
                                </div>
                            </div>
                            <div style="display: flex;align-items: center;justify-content: space-between;">
                                <div style="display: flex;flex-wrap: wrap;align-items: center;padding: 0 4rem">
                                    <div style="margin:0 2rem 1rem 0;" v-for="(t, i) in item.key" :key="i"
                                        :style="{ display: t ? 'block' : 'none' }">{{ _t('10') }}{{ i + 1 }} {{ t ==
                                            1 ? _t('b1') : _t('b2') }}</div>
                                </div>

                                <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                    <div>{{ _t('bb14') }} {{ item.amount }}</div>
                                    <div>{{ _t('bb15') }}</div>
                                    <div>{{ item.amount * item.p }}</div>
                                </div>
                            </div>

                        </div>
                        <!-- 大小  -->
                        <div class="bet_item" v-if="[13, 19].includes(item.code)">
                            <div class="bet_info">
                                <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                <div class="bet_info_per">{{ item.p }}</div>
                                <div class="bet_ipt_box">
                                    <span></span>
                                    <input type="number" v-model="item.amount" class="bet_ipt"
                                        :placeholder="_t('bb14')">
                                </div>
                            </div>
                            <div style="display: flex;align-items: center;justify-content: space-between;">
                                <div style="display: flex;flex-wrap: wrap;align-items: center;padding:0 4rem">
                                    <div style="margin:0 2rem 1rem 0;" :style="{ display: t ? 'block' : 'none' }"
                                        v-for="(t, i) in item.key" :key="i">{{ _t('10') }}{{ i + 1 }} {{ t ==
                                            1 ? '≥' + bigNum : '<' + bigNum }}</div>
                                    </div>

                                    <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                        <div>{{ _t('bb14') }} {{ item.amount }}</div>
                                        <div>{{ _t('bb15') }}</div>
                                        <div>{{ item.amount * item.p }}</div>
                                    </div>
                                </div>

                            </div>
                            <!-- 特殊球颜色 -->
                            <div class="bet_item" v-if="[16].includes(item.code)">
                                <div class="bet_info">
                                    <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                    <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                    <div class="bet_info_per">{{ item.p }}</div>
                                    <div class="bet_ipt_box">
                                        <span></span>
                                        <input type="number" v-model="item.amount" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>
                                </div>

                                <div style="display: flex;align-items: center;justify-content: space-between;">
                                    <div style="display: flex;align-items: center;padding: 0 4rem">
                                        <div style="width:8rem;height:8rem;border-radius: 50%;margin-right:2rem"
                                            :style="{ backgroundColor: colorMap[item.key] }"></div>
                                        <span>{{ colorTextMap()[item.key] }}</span>
                                    </div>

                                    <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                        <div>{{ _t('bb14') }} {{ item.amount }}</div>
                                        <div>{{ _t('bb15') }}</div>
                                        <div>{{ item.amount * item.p }}</div>
                                    </div>
                                </div>

                            </div>
                            <!-- 球的颜色 -->
                            <div class="bet_item" v-if="[11].includes(item.code)">
                                <div class="bet_info">
                                    <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                    <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                    <div class="bet_info_per">{{ item.p }}</div>
                                    <div class="bet_ipt_box">
                                        <span></span>
                                        <input type="number" v-model="item.amount" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>
                                </div>

                                <div style="display: flex;align-items: center;justify-content: space-between;">
                                    <div style="display: flex;flex-wrap: wrap;align-items: center;padding: 0 4rem">
                                        <div v-for="(t, i) in item.key" :key="i"
                                            style="margin:0 2rem 1rem 0;;align-items: center;"
                                            :style="{ display: t ? 'flex' : 'none' }">
                                            <div>{{ _t('10') }}{{ i }} </div>
                                            <div style="width:4rem;height:4rem;border-radius: 50%;margin:0 1rem"
                                                :style="{ backgroundColor: colorMap[t] }"></div>
                                            <span>{{ colorTextMap()[t] }}</span>
                                        </div>
                                    </div>

                                    <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                        <div>{{ _t('bb14') }} {{ item.amount }}</div>
                                        <div>{{ _t('bb15') }}</div>
                                        <div>{{ item.amount * item.p }}</div>
                                    </div>
                                </div>

                            </div>
                            <!-- 特别号码/第一个号码 -->
                            <div class="bet_item" v-if="[15, 10].includes(item.code)">
                                <div class="bet_info">
                                    <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                    <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                    <div class="bet_info_per">{{ item.p }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ item.key.length }}X</span>
                                        <input type="number" v-model="item.amount" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>
                                </div>

                                <div style="display: flex;align-items: center;justify-content: space-between;">
                                    <div style="display: flex;flex-wrap: wrap;align-items: center;padding: 0 4rem">
                                        <div :style="{ backgroundColor: getColor(t) }" v-for="(t, i) in item.key"
                                            :key="i"
                                            style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#fff;font-weight: bold;display: flex;">
                                            {{ t }}
                                        </div>
                                    </div>

                                    <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                        <div>{{ _t('bb14') }} {{ item.amount * item.key.length }}</div>
                                        <div>{{ _t('bb15') }}</div>
                                        <div>{{ item.amount * item.p }}</div>
                                    </div>
                                </div>

                            </div>
                            <!-- 单式投注 -->
                            <div class="bet_item" v-if="[9].includes(item.code)">
                                <div class="bet_info">
                                    <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                    <div class="bet_info_name">{{ game.name == 'bet365' ? _t('bb16') :
                                        typeMap[item.code] }}
                                    </div>
                                    <div class="bet_info_per">{{ item.special ? item.p2 : item.p }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ item.times ? item.times + 'X' : '' }}</span>
                                        <input type="number" v-model="item.amount" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>
                                </div>



                                <div style="display: flex;align-items: center;justify-content: space-between;">
                                    <div style="display: flex;flex-wrap: wrap;align-items: center;padding: 0 4rem">
                                        <div :style="{ backgroundColor: getColor(t) }" v-for="(t, i) in item.key"
                                            :key="i"
                                            style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#fff;font-weight: bold;display: flex;">
                                            {{ t }}
                                        </div>
                                    </div>
                                    <div style="text-align: right;padding-right:4rem" v-if="item.amount">
                                        <div>{{ _t('bb14') }} {{ item.times ? item.times * item.amount : item.amount }}
                                        </div>
                                        <div>{{ _t('bb15') }}</div>
                                        <div>{{ item.times ? item.times * item.amount * (item.special ? item.p2 :
                                            item.p) :
                                            item.amount * (item.special ? item.p2 : item.p) }}</div>
                                    </div>

                                </div>

                                <!-- 365 -->
                                <div style="padding: 2rem 4rem;" v-if="game.name == 'bet365'">
                                    <div
                                        style="display: flex;border:1px solid #eee;align-items: stretch;height: 10rem;">
                                        <div @click="item.times = null"
                                            style="flex: 1;border-right: 1px solid #eee;padding-left: 2rem;display: flex;align-items: center;">
                                            {{ _t('bb17') }}</div>
                                        <div @click="item.times = 5"
                                            :style="{ backgroundColor: item.times == 5 ? '#eee' : '' }"
                                            style="flex: 1;border-right: 1px solid #eee;padding-left: 2rem;display: flex;align-items: center;">
                                            {{ _t('bb18') }}</div>
                                        <div @click="item.times = 10"
                                            :style="{ backgroundColor: item.times == 10 ? '#eee' : '' }"
                                            style="flex: 1;border-right: 1px solid #eee;padding-left: 2rem;display: flex;align-items: center;">
                                            {{ _t('bb19') }}</div>
                                        <div @click="item.times = 20"
                                            :style="{ backgroundColor: item.times == 20 ? '#eee' : '' }"
                                            style="flex: 1;padding-left: 1rem;display: flex;align-items: center;">{{
                                                _t('bb20') }}
                                        </div>
                                    </div>
                                </div>
                                <!-- 非365 -->
                                <div style="padding: 2rem 4rem;" v-else>
                                    <van-checkbox v-model="item.special" shape="square">{{ _t('bb21') }}</van-checkbox>
                                </div>
                            </div>
                            <!-- 组合投注 -->
                            <div class="bet_item" v-if="[14].includes(item.code)">
                                <div class="bet_info">
                                    <van-icon @click="removeItem(i)" class="bet_info_delete" name="cross" />
                                    <div class="bet_info_name">{{ typeMap[item.code] }}</div>
                                    <div style="flex:1"></div>
                                </div>

                                <div
                                    style="display: flex;align-items: center;justify-content: space-between;padding-right:4rem">
                                    <div style="display: flex;flex-wrap: wrap;align-items: center;padding: 0 4rem">
                                        <div :style="{ backgroundColor: getColor(t) }" v-for="(t, i) in item.key"
                                            :key="i"
                                            style="margin:0 1rem 1rem 0;align-items: center;justify-content: center;width: 6rem;height: 6rem;border-radius: 50%;color:#fff;font-weight: bold;display: flex;">
                                            {{ t }}
                                        </div>
                                    </div>

                                    <van-checkbox v-model="item.special" shape="square">{{ _t('bb21') }}</van-checkbox>
                                </div>

                                <!-- 1串1 -->
                                <div class="bet_info" style="border-top:1px solid #eee;margin-top:4rem">
                                    <div class="bet_info_name" style="font-size: 3.4rem;margin-left: 4rem;">{{
                                        _t('bb22') }}</div>
                                    <div class="bet_info_per">{{ getGroupP(1, item.special) }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ combination(item.key.length, 1) }}X</span>
                                        <input type="number" v-model="item.amount1" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>

                                    <div v-if="item.amount1" style="width: 100%;text-align: right;padding: 4rem;">
                                        <div>{{ _t('bb14') }} {{ item.amount1 * combination(item.key.length, 1) }}</div>
                                        <div>{{ _t('bb15') }} {{ item.amount1 * Math.min(item.key.length, (item.special
                                            ?
                                            game.lottery_number : game.lottery_number -
                                            1)) * getGroupP(1, item.special)
                                            }}</div>
                                    </div>
                                </div>

                                <div style="color: burlywood;font-size: 3.2rem;padding-left: 4rem"
                                    @click="item.switch = !item.switch">{{
                                        !item.switch ? _t('bb23') : _t('bb24') }}</div>

                                <!-- 2串1 -->
                                <div v-if="item.key.length >= 2 && item.switch" class="bet_info"
                                    style="border-top:1px solid #eee;margin-top:4rem">
                                    <div class="bet_info_name" style="font-size: 3.4rem;margin-left: 4rem;">{{
                                        _t('bb25') }}</div>
                                    <div class="bet_info_per">{{ getGroupP(2, item.special) }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ combination(item.key.length, 2) }}X</span>
                                        <input type="number" v-model="item.amount2" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>

                                    <div v-if="item.amount2" style="width: 100%;text-align: right;padding: 4rem;">
                                        <div>{{ _t('bb14') }} {{ item.amount2 * combination(item.key.length, 2) }}</div>
                                        <div>{{ _t('bb15') }} {{ item.amount2 * Math.min(item.key.length, (item.special
                                            ?
                                            game.lottery_number : game.lottery_number -
                                            1)) * getGroupP(2, item.special)
                                            }}</div>
                                    </div>
                                </div>

                                <!-- 3串1 -->
                                <div v-if="item.key.length >= 3 && item.switch" class="bet_info"
                                    style="border-top:1px solid #eee;margin-top:4rem">
                                    <div class="bet_info_name" style="font-size: 3.4rem;margin-left: 4rem;">{{
                                        _t('bb26') }}</div>
                                    <div class="bet_info_per">{{ getGroupP(3, item.special) }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ combination(item.key.length, 3) }}X</span>
                                        <input type="number" v-model="item.amount3" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>

                                    <div v-if="item.amount3" style="width: 100%;text-align: right;padding: 4rem;">
                                        <div>{{ _t('bb14') }} {{ item.amount3 * combination(item.key.length, 3) }}</div>
                                        <div>{{ _t('bb15') }} {{ item.amount3 * Math.min(item.key.length, (item.special
                                            ?
                                            game.lottery_number : game.lottery_number -
                                            1)) * getGroupP(3, item.special)
                                            }}</div>
                                    </div>
                                </div>

                                <!-- 4串1 -->
                                <div v-if="item.key.length >= 4 && item.switch" class="bet_info"
                                    style="border-top:1px solid #eee;margin-top:4rem">
                                    <div class="bet_info_name" style="font-size: 3.4rem;margin-left: 4rem;">{{
                                        _t('bb27') }}</div>
                                    <div class="bet_info_per">{{ getGroupP(4, item.special) }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ combination(item.key.length, 4) }}X</span>
                                        <input type="number" v-model="item.amount4" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>

                                    <div v-if="item.amount4" style="width: 100%;text-align: right;padding: 4rem;">
                                        <div>{{ _t('bb14') }} {{ item.amount4 * combination(item.key.length, 4) }}</div>
                                        <div>{{ _t('bb15') }} {{ item.amount4 * Math.min(item.key.length, (item.special
                                            ?
                                            game.lottery_number : game.lottery_number -
                                            1)) * getGroupP(4, item.special)
                                            }}</div>
                                    </div>
                                </div>

                                <!-- 5串1 -->
                                <div v-if="item.key.length >= 5 && item.switch" class="bet_info"
                                    style="border-top:1px solid #eee;margin-top:4rem">
                                    <div class="bet_info_name" style="font-size: 3.4rem;margin-left: 4rem;">{{
                                        _t('bb28') }}</div>
                                    <div class="bet_info_per">{{ getGroupP(5, item.special) }}</div>
                                    <div class="bet_ipt_box">
                                        <span>{{ combination(item.key.length, 5) }}X</span>
                                        <input type="number" v-model="item.amount5" class="bet_ipt"
                                            :placeholder="_t('bb14')">
                                    </div>

                                    <div v-if="item.amount5" style="width: 100%;text-align: right;padding: 4rem;">
                                        <div>{{ _t('bb14') }} {{ item.amount5 * combination(item.key.length, 5) }}</div>
                                        <div>{{ _t('bb15') }} {{ item.amount5 * Math.min(item.key.length, (item.special
                                            ?
                                            game.lottery_number : game.lottery_number -
                                            1)) * getGroupP(5, item.special)
                                            }}</div>
                                    </div>
                                </div>

                            </div>

                    </template>
                </div>
                <div class="bet_bottom" @click="goBet"
                    :style="{ opacity: (allBet[0] && allBet[0] * 1 > 0) ? (loading ? '0.5' : '1') : '0.5' }">
                    <div>{{ _t('9') }} {{ pre }}{{ allBet[0] }}</div>
                    <div class="return" v-if="allBet[1]">{{ _t('bb15') }} {{ pre }}{{ allBet[1] }}</div>
                </div>
            </div>
        </van-popup>
</template>

<script setup>
import Top from "@/components/Top.vue"
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { colorMap, colorTextMap } from './map'
import Number from "./components/Number.vue"
import BallColor from "./components/BallColor.vue"
import Color from "./components/Color.vue"
import One from "./components/One.vue"
import Ones from "./components/Ones.vue"
import Total from "./components/Total.vue"
import Record from "./Record.vue"
import TotalBet from "./components/TotalBet.vue"
import http from "@/api/index"
import store from "@/store"
import { showToast } from "vant"
import { _t } from "@/lang/index";
import { _typeMap } from "@/tools/utils"

const NumberRef = ref()
const BallColorRef = ref()
const ColorRef = ref()
const OnesRef = ref()
const OneRef = ref()
const TotalRef = ref()
const pre = computed(() => {
    if (store.state.config?.currency) return store.state.config.currency + ' '
    return ' '
})

store.dispatch('updateUser')
const userInfo = computed(() => store.state.userInfo || {})

const getColor = (num) => {
    let color = 'grey'
    for (let key in config.value.number_json) {
        if (config.value.number_json[key].includes(num)) {
            color = key
        }
    }
    return colorMap[color]
}


// 预投注
const preItem = ref({})
const preBet = item => { // code: 玩法  key: 投注项  p: 倍率
    preItem.value = item
}
const addToList = () => {
    betList.value.push(preItem.value)
    preItem.value = {}
    // 清空选项
    NumberRef.value && NumberRef.value.clear()
    BallColorRef.value && BallColorRef.value.clear()
    ColorRef.value && ColorRef.value.clear()
    OnesRef.value && OnesRef.value.clear()
    OneRef.value && OneRef.value.clear()
    TotalRef.value && TotalRef.value.clear()
}
const typeMap = computed(() => _typeMap() || {})


// 投注
const loading = ref(false)
const showBottom = ref(false)
const betList = ref([])
const allBet = computed(() => {
    let all = 0
    let all2 = 0
    betList.value.forEach(item => {
        if ([15, 10].includes(item.code)) { // 特别号码/第一个号码
            if (item.amount && item.amount > 0) {
                all += item.amount * item.key.length
                all2 += item.amount * item.p
            }
        } else if ([9].includes(item.code)) { // 单式投注
            if (item.amount) {
                all += (item.times ? item.times * item.amount : item.amount)
                all2 += (item.times ? item.times * item.amount : item.amount) * (item.special ? item.p2 : item.p)
            }
        } else if ([14].includes(item.code)) { // 组合投注
            if (item.amount1) {
                all += (item.amount1 * combination(item.key.length, 1))
                all2 += (item.amount1 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(1, item.special)
            }
            if (item.amount2) {
                all += (item.amount2 * combination(item.key.length, 2))
                all2 += (item.amount2 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(2, item.special)
            }
            if (item.amount3) {
                all += (item.amount3 * combination(item.key.length, 3))
                all2 += (item.amount3 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(3, item.special)
            }
            if (item.amount4) {
                all += (item.amount4 * combination(item.key.length, 4))
                all2 += (item.amount4 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(4, item.special)
            }
            if (item.amount5) {
                all += (item.amount5 * combination(item.key.length, 5))
                all2 += (item.amount5 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(5, item.special)
            }
        } else {
            if (item.amount) {
                all += item.amount
                all2 += item.amount * item.p
            }
        }
    })
    return [all, all2]
})
const removeItem = i => {
    betList.value.splice(i, 1)
    if (!betList.value.length) {
        showBottom.value = false
    }
}
const goBet = () => {
    if (!allBet.value[0] || allBet.value[0] * 1 < 0) return
    if (loading.value) return
    if ((userInfo.value.money * 1) < (allBet.value[0] * 1)) return showToast(_t('bb29'))
    loading.value = true
    http.game_expect({
        lotto_id: game.value.id
    }).then(res => {
        if (res && res[0]) {
            setTimeout(() => {
                loading.value = true
                const list = []
                betList.value.forEach(item => {
                    if ([15, 10].includes(item.code)) { // 特别号码/第一个号码
                        if (item.amount && item.amount > 0) {
                            item.key.forEach(a => {
                                const obj = JSON.parse(JSON.stringify(item))
                                list.push({
                                    ...obj,
                                    key: a,
                                    winning_return: item.amount * item.p
                                })
                            })
                        }
                    } else if ([9].includes(item.code)) { // 单式投注
                        if (item.amount) {
                            item.amount = (item.times ? item.times * item.amount : item.amount)
                            item.winning_return = item.times ? item.times * item.amount * (item.special ? item.p2 : item.p) :
                                item.amount * (item.special ? item.p2 : item.p)
                            list.push(item)
                        }
                    } else if ([14].includes(item.code)) { // 组合投注
                        if (item.amount1) {
                            const it = JSON.parse(JSON.stringify(item))
                            it.amount = (item.amount1 * combination(item.key.length, 1))
                            it.code = 21
                            it.winning_return = (item.amount1 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(1, item.special)
                            list.push(it)
                        }
                        if (item.amount2) {
                            const it = JSON.parse(JSON.stringify(item))
                            it.amount = (item.amount2 * combination(item.key.length, 2))
                            it.code = 22
                            it.winning_return = (item.amount2 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(2, item.special)
                            list.push(it)
                        }
                        if (item.amount3) {
                            const it = JSON.parse(JSON.stringify(item))
                            it.amount = (item.amount3 * combination(item.key.length, 3))
                            it.code = 23
                            it.winning_return = (item.amount3 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(3, item.special)
                            list.push(it)
                        }
                        if (item.amount4) {
                            const it = JSON.parse(JSON.stringify(item))
                            it.amount = (item.amount4 * combination(item.key.length, 4))
                            it.code = 24
                            it.winning_return = (item.amount4 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(4, item.special)
                            list.push(it)
                        }
                        if (item.amount5) {
                            const it = JSON.parse(JSON.stringify(item))
                            it.amount = (item.amount5 * combination(item.key.length, 5))
                            it.code = 24
                            it.winning_return = (item.amount5 * Math.min(item.key.length, (item.special ? game.value.lottery_number : game.value.lottery_number - 1))) * getGroupP(5, item.special)
                            list.push(it)
                        }
                    } else if ([11].includes(item.code)) { // 球的颜色
                        if (item.amount) {
                            item.key.shift() // 去掉第一个空元素

                            item.winning_return = item.amount * item.p
                            list.push(item)
                        }
                    } else {
                        if (item.amount) {
                            item.winning_return = item.amount * item.p
                            list.push(item)
                        }
                    }
                })
                const params = list.map(item => {
                    return {
                        lotto_id: game.value.id,
                        expect: res[0].expect,
                        category_id: item.code,
                        bet_content: item.key,
                        amount: item.amount,
                        special: item.special ? 1 : 0,
                        winning_return: item.winning_return
                    }
                })
                http.game_buy(params).then(res => {
                    if (res.code == 1) {
                        showBottom.value = false
                        betList.value = []
                        showToast(_t('bb30'))
                        store.dispatch('updateUser')
                    } else {
                        showToast(res.msg)
                    }

                }).finally(() => {
                    loading.value = false
                })
            }, 5)
        }
    }).finally(() => {
        loading.value = true
    })

}

// 组合相关
const getGroupP = (i, isSpecial) => {
    const obj = isSpecial ? config.value.special_json : config.value.single_json
    const arr = obj[i].split('/')
    return ((arr[0] * 1) + (arr[1] * 1)) / (arr[1] * 1)
}



// 配置
const active = ref(0)
const game = computed(() => store.state.currGame || {})
const numbers = ref([])
const bigNum = computed(() => Math.ceil((numbers.value.length + 1) / 2))
const config = ref({
    number_json: {}, // 号码和颜色
    oe_json: {}, // 单双赔率
    bs_json: {}, // 大小赔率
    single_json: {}, // 单试
    combination_json: {}, // 组合
    special_json: {}, // 特殊
    sum_json: {}, // 总和
    yanse_json: {}, // 颜色
    other_json: {}, // 其他
})
const infoLoading = ref(false)
const getInfo = () => {
    infoLoading.value = true
    http.game_payout({
        lotto_id: game.value.id
    }).then(res => {
        if (res) {
            if (res.number_json) {
                try {
                    config.value.number_json = JSON.parse(res.number_json)
                    for (let key in config.value.number_json) {
                        config.value.number_json[key] = config.value.number_json[key].split(',')
                        numbers.value.push(...config.value.number_json[key])
                        numbers.value = numbers.value.sort((a, b) => a - b)
                    }
                } catch { }
            }
            if (res.oe_json) {
                try { config.value.oe_json = JSON.parse(res.oe_json) } catch { }
            }
            if (res.bs_json) {
                try { config.value.bs_json = JSON.parse(res.bs_json) } catch { }
            }
            if (res.single_json) {
                try { config.value.single_json = JSON.parse(res.single_json) } catch { }
            }
            if (res.combination_json) {
                try { config.value.combination_json = JSON.parse(res.combination_json) } catch { }
            }
            if (res.special_json) {
                try { config.value.special_json = JSON.parse(res.special_json) } catch { }
            }
            if (res.sum_json) {
                try { config.value.sum_json = JSON.parse(res.sum_json) } catch { }
            }
            if (res.yanse_json) {
                try { config.value.yanse_json = JSON.parse(res.yanse_json) } catch { }
            }
            if (res.other_json) {
                try { config.value.other_json = JSON.parse(res.other_json) } catch { }
            }

            console.error('config', config.value)
        }
    }).finally(() => {
        infoLoading.value = false
    })
}
getInfo()


function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function combination(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}


// 获取期号
const currE = ref({})
const timeStr = ref('')
let interval = null
const getE = () => {
    http.game_expect({
        lotto_id: game.value.id
    }).then(res => {
        if (res && res[0]) {
            currE.value = res[0]
        }
    })
}
getE()
const formatSec2 = (timestamp) => {
    if (!timestamp) return ''
    let seconds = timestamp - Date.now() / 1000
    if (seconds <= 0) return ''
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const sec = Math.ceil(seconds % 60)
    return `${hours}:${minutes}:${sec}`;
}

onMounted(() => {
    interval = setInterval(() => {
        timeStr.value = formatSec2(currE.value.lotterytime)
        if (!timeStr.value) {
            getE()
        }
    }, 1000)
})
onBeforeUnmount(() => {
    interval && clearInterval(interval)
})
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
    background-color: #383838;
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
                color: fff;
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
        flex-direction: column;
        font-weight: bold;
        font-size: 4rem;
        background-color: #8475f9;
        color: #fff;

        .return {
            font-size: 3rem;
            color: rgba(255, 255, 255, 0.8);
        }
    }

    .bet_content {
        flex: 1;
        overflow-y: auto;
        max-height: 60vh;

        .bet_item {
            padding: 2rem 0;
            border-bottom: 1px solid #eeeeee;

            .bet_info {
                display: flex;
                flex-wrap: wrap;
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
                    background-color: #383838;
                    height: 10rem;
                    padding: 0 2rem;
                    border: 1px solid #666;

                    .bet_ipt {
                        height: 100%;
                        flex: 1;
                        background-color: rgba(0, 0, 0, 0);
                        border: none;
                        width: 20rem;
                        text-align: center;
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

.pre_bet {
    position: fixed;
    max-width: 720px;
    width: 90%;
    padding: 2rem 4rem;
    border-radius: 2rem;
    z-index: 999;
    bottom: 6rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #383838;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;

        .close {
            margin-right: 2rem;
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4rem 0;

        .link {
            color: #076B4C;
            white-space: nowrap;
        }
    }
}

.tip_num {
    position: fixed;
    z-index: 99;
    right: 4rem;
    bottom: 10rem;
    width: 10rem;
    height: 10rem;
    background-color: #13694D;
    border-radius: 50%;
    color: #fff;
    font-size: 5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>