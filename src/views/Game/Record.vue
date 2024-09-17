<!-- 结果 -->
<template>
    <div class="bet_his">

        <div class="title">
            <span>号码大小</span>
            <!-- <span>摇奖次序</span> -->
            <van-icon name="arrow-down" />
        </div>

        <div class="list">
            <div class="item" v-for="i in 50" :key="i">
                <div class="left">
                    <div>星期一 16 9月 23:49</div>
                    <div>摇奖次序 2</div>
                </div>
                <div class="right">
                    <div class="ball" v-for="i in 7">{{ i }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

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
        }
    }
}
</style>