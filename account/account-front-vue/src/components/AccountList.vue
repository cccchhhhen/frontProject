<template>
    <div>account list</div>
    <button @click="craeetAccount">添加</button>
    <!-- <button @click="getAccountList">get data</button> -->
    <button @click="exit">exit</button>
    <div v-for="(item, index) in accountList.data" :key="index">
        <div>{{ (item as any).title }}</div>
        <div>{{ (item as any).account }}</div>
        <div>{{ new Date((item as any).time).toLocaleString() }}</div>
        <div>{{ (item as any).remark }}</div>
    </div>
    
</template>
<script setup lang="ts" name="test">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { getAccountInter} from '@/api';
    import { removeToken } from '@/utils/auth';
    let accountList = reactive({
        data: [],
        loading: false,
        err: null
    });

    const router = useRouter();
    const craeetAccount = () => {
        router.push({path:'/createAccount'});
    }
    const exit = () => {
        router.replace({path:'/login'});
        removeToken();
    }
    getAccountList();

    async function getAccountList (){
        try{
            if(!accountList.loading){
                accountList.loading = true;
                const response = await getAccountInter();
                if(response.data.code === '0000'){
                    // 解构后端数据，直接提取嵌套data
                    console.log('获取账单列表成功')
                    accountList.data = response.data.data;  // 跳过冗余层级
                    accountList.err = null;
                }
                else{
                    console.log(response.data);
                }
                
            }
            
        }catch(err){
            // accountList.err = err.message;
            console.log('获取账单列表失败~~',err);
        }finally{
            accountList.loading = false;
        }
    }
</script>