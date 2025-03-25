<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const handleClick = () => {
  console.log('click')
}

import { ref } from "vue";

const list = ref([])
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
])
//其中total是数据总条数，page是当前的页数，设置name根据name进行条件搜索
const config = reactive({
  total: 0,
  page: 1,
  name: "",
})
const getUserData = async ()=> {
    let data = await proxy.$api.getUserData(config);
    // console.log(data);
    list.value = data.list.map((item:any)=>({
        ...item,
        sexLabel: item.sex === 0 ? '女' : '男'
    }));
    // console.log(list.value)
    config.total = data.count;
    console.log(config.total)
    
}
onMounted(()=>{
    getUserData();
})
// const handleDelete =  (val: any) => {
// }
// const handleEdit =  (val: any) => {
// }
const changePage =  (page: number) => {
    config.page = page;
    // console.log('page',page)
    getUserData();
}
   
const formInline = reactive({
  keyword: "",
})
const handleSerch = () => {
    config.name = formInline.keyword;
    getUserData();
}

</script>

<template>
    <div class="user-header">
        <el-button type="primary">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSerch" >搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="list" style="width: 100%">
        <el-table-column 
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width? item.width : '125px'" />
        <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default>
            <el-button type="primary" size="small" @click="handleClick">
            编辑
            </el-button>
            <el-button type="danger" size="small" >删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="config.total"
        size="small"
        @current-page="changePage"
        class="pager"
    />
</template>

<style scoped lang="less">
.user-header{
    display: flex;
    justify-content: space-between;
}
</style>