<template>
    <h3>Login</h3>
     <form class="loginForm" @submit.prevent="handleLoginSubmit">
        <label for="username">用户名</label>
        <input type="text" v-model="formData.username" id="username">
        <label for="password">密码</label>
        <input type="password" v-model="formData.password" id="password">
        <button type="submit">登录</button>
     </form>
     <button @click="reg">注册</button>
</template>
<script lang="ts" setup name="Login">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { userLogin } from '../api';
    import { setToken } from '../utils/auth';
    const formData = ref({
        username:'',
        password:''
    });
    const reg = () => {
        router.push({path:'/reg'});
    }
    const router = useRouter();
    const isLoading = ref(false);
    const handleLoginSubmit = async () => {
        try{
            isLoading.value = true;
            const response = await userLogin(formData.value);
            console.log(response);
            if(response.data.code === '0000'){
                console.log('登陆成功');
                // 存储认证信息
                setToken(response.data.data);
                router.push({
                    path: '/accountList',
                    query: { t: Date.now() } // 添加时间戳参数强制刷新
                });
            }else{
                console.log(response.data);
            }
        }catch(err){
            console.log('登录出错啦~~',err);
        }
    }

</script>

<style></style>