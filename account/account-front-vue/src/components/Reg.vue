<template>
    <h3>reg</h3>
    <form class="loginForm" @submit.prevent="handleRegSubmit">
        <label for="username">用户名</label>
        <input type="text" v-model="formData.username" id="username">
        <label for="password">密码</label>
        <input type="password" v-model="formData.password" id="password">
        <button type="submit">注册</button>
     </form>
     <button @click="login">login</button>
</template>

<script setup lang="ts">
    
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    // import axios from 'axios';
    import {userReg} from '../api';
    const formData = ref({
        username:'',
        password:''
    });
    const router = useRouter();
    const login = () => {
        router.push({path:'/login'});
    }
    const handleRegSubmit = async () => {
        try{
            const response = await userReg(formData.value);
            console.log('response',response);
            // const response = await axios.post('http://127.0.0.1:9000/reg',formData.value);
            if(response.data.code === '0000'){ // reg success
                router.replace({path:'/login'});

            }
        }catch(err){
            console.log('注册失败~~~',err);
        }
    };

</script>