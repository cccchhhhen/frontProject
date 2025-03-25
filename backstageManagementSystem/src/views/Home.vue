<script setup lang="ts">
    import { ref, onMounted, getCurrentInstance, reactive } from 'vue';
    // 导入 echarts
    import * as echarts from 'echarts';
    interface countDataType{
        name: String,
        value: Number,
        icon: String,
        color: String
        // date?: String,
        // new?: Number,
        // active?: Number
    }
    interface seriesType{
        name: String,
        data: Object,
        type: String
    }
    const xOptions = reactive({
        // 图例文字颜色
        textStyle: {
            color: '#333',
            // fontStyle:'italic'
        },
        legend:{},
        grid: {
            left:'20%',
        },
        // 提示框
        tooltip: {
            trigger:'axis'
        },
        xAxis: {
            // symbol:'arrow',
            name:'日期',
            type: 'category',
            // type: 'time',
            data:[],
            axisLine: {
                lineStyle:{
                    color:'#17b3a3',
                }
            },
            axisLabel: {
                interval: 0,
                color: '#333'
            },
        },
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle:{
                        color:'#17b3a3',
                    }
                },
                
            }
        ],
        colors: ['#2ec7c9', '#b6a2de', '#5ablef', '#ffb980', '#d87a80', '#8d98b3'],
        series: <seriesType[]>[]

    })
    const pieOptions = reactive({
        tooltip: {
            trigger: 'item',
        },
        legend:{},
        color:[
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#elbb22',
            '#39c362',
            '#3edlcf',
        ]
    })

    const { proxy } = getCurrentInstance();
    const observer = ref();

    const tableData = ref([]);
    const tableLabel = ref({
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
    });
    
    const countData = ref<countDataType[]>([]);

    const getImageUser = (user: string) => {
        return new URL(`../assets/images/${user}.png`,import.meta.url).href;
    }

    const getTableData = async () => {
        const data = await proxy.$api.getTableData();
        tableData.value = data.tableData;
    }
    const getCountData = async () => {
        const data = await proxy.$api.getCountData();
        countData.value = data.countData;
    }
    const getChartsData = async () => {
        const {orderData, userData, videoData} = await proxy.$api.getChartData();
        // 对第一个图表进行x轴和series赋值
        xOptions.xAxis.data = orderData.date;
        xOptions.series = Object.keys(orderData.data[0]).map(val=>({
            name:val,
            data:orderData.data.map((item: any) => item[val]),
            type:'line'
        }))
        const oneEchart = echarts.init(proxy.$refs['echart'])
        oneEchart.setOption(xOptions);
        // 对第二个表格进行渲染
        xOptions.xAxis.data = userData.map((item: any)=>item.date)
        xOptions.series = [
            {
                name:'新增用户',
                data: userData.map((item: any)=>item.new),
                type:'bar'
            },
            {
                name:'活跃用户',
                data: userData.map((item: any)=>item.active),
                type:'bar'
            }
        ]
        const twoEchart = echarts.init(proxy.$refs['userEchart'])
        twoEchart.setOption(xOptions);
        // 对饼状图进行渲染
        pieOptions.series = [
            {
                data: videoData,
                type: 'pie'
            }
        ]
        const threeEchart = echarts.init(proxy.$refs['videoEchart'])
        threeEchart.setOption(pieOptions);

        observer.value = new ResizeObserver((en) => {
            oneEchart.resize();
            twoEchart.resize();
            threeEchart.resize();
        })

        // 如果容器存在
        if(proxy.$refs['echart']){
            observer.value.observe(proxy.$refs['echart']);
        }
    }
    onMounted( () => {
        getTableData();
        getCountData();
        getChartsData();
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

        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card
                    :body-style="{display:'flex',padding:0,alignItems:'center'}"
                    v-for="item in countData" 
                    :key="item.name">
                    <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
                    <div class="detail">
                        <p class="num">{{ item.value }}</p>
                        <p class="txt">￥{{ item.name }}</p>
                    </div>
                </el-card>
                
            </div>
            <el-card class="top-echart">
                <div ref="echart" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="userEchart" style="height: 240px;"></div>
                </el-card>
                <el-card>
                    <div ref="videoEchart" style="height: 240px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.home{
    // height: 100%;
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
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width: 32%;
            margin-bottom: 20px;
        }
        .icons{
            width: 60px;
            height: 60px;
            // font-size: 30px;
            // text-align: center;
            // line-height: 80px;
            color: #fff;
        }
        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .num{
                font-size: 30px;
                margin-bottom: 10px;
            }
            .txt{
                font-size: 15px;
                text-align: center;
                color: #999;
            }
        }
    }
    .graph{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .el-card{
            width: 48%;
            height: 260px;
        }
    }
}

</style>