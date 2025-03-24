<script setup lang="ts">
    import { ref, onMounted, getCurrentInstance } from 'vue';
    // import axios from 'axios';

    // 组件中使用
    // import { inject } from 'vue'
    // const $api = inject('$api')
    const { proxy } = getCurrentInstance();

    const tableData = ref([])
    const tableLabel = ref({
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
    })
    const countData = ref([])

    const getImageUser = (user: string) => {
        return new URL(`../assets/images/${user}.png`,import.meta.url).href;
    }

    const getTableData = async () => {
        const data = await proxy.$api.getTableData();
        // console.log(data);
        // const data = await $api.getTableData();
        tableData.value = data.tableData;
    }
    const getCountData = async () => {
        const data = await proxy.$api.getCountData();
        // console.log(data);
        // const data = await $api.getTableData();
        countData.value = data.countData;
    }
    onMounted( () => {
        getTableData();
        getCountData();
    })

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
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column
                      v-for="(val, key) in tableLabel"
                      :key="key"
                      :prop="key"
                      :label="val"
                    >
                </el-table-column>
                </el-table>
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
    .user-table{
        margin-top: 20px;
    }
}

</style>