<script setup lang="ts">
    const getImageUser = (user: string) => {
        return new URL(`../assets/images/${user}.png`,import.meta.url).href;
    }
</script>
<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUser('user')">
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">super manager</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间: <span>2025-3-21</span></p>
                    <p>上次登录地点: <span>北京</span></p>
                </div>
            </el-card>
        </el-col>

    </el-row>
</template>

<style scoped lang="less">
.home{
    height: 100%;
    overflow: hidden;
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
    .login-info{
        p{
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span{
                color: #666;
                margin-right: 60px;
            }
        }
    }
}

</style>