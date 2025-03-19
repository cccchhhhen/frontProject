<template>
    <div>create test</div>
    <form @submit.prevent="submitAccount">
        <input type="text" v-model="formData.title" placeholder="事项">
        <input type="datetime-local" v-model="formData.time" placeholder="时间">
        <input type="text" v-model="formData.account" placeholder="金额">
        <select name="type" v-model="formData.type" id="type">
            <option value="">类型</option>
            <option value="1">收入</option>
            <option value="-1">支出</option>
        </select>
        <input type="text" v-model="formData.remark" placeholder="备注">
        <button type="submit">submit</button>
    </form>
</template>

<script setup lang="ts">
    // import axios from 'axios';
    import { ref } from 'vue';
    import { createAccount } from '../api';
    const formData = ref({
        title:'',
        time:'',
        account:'',
        type:'',
        remark:''
    });
    const submitAccount = async () => {
        try{
            const response = await createAccount(formData.value);
            // console.log(response);
            if(response.data.code === '0000'){
                console.log('添加账单成功')
            }
            else{
                console.log(response.data);
            }
        }catch(err){
            console.log('添加账单失败~~');
            console.log(err);
        }
    }
</script>

<style scoped>
input{
    display: block;
}
input, select{
    width: 400px;
}
</style>