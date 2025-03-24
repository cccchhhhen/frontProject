import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
// 完整引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus/icon 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入 pinia
import { createPinia } from 'pinia';
// 引入 mockjs
import "@/api/mock.ts"
// 引入api
import api from "@/api/api";
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 挂载全局api -> 不推荐
app.config.globalProperties.$api = api;

// 全局挂载
// app.provide('$api', api)

const pinia = createPinia();
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount('#app')
