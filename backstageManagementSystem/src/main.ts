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
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

const pinia = createPinia();
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount('#app')
