<template>
    <!-- el-aside 侧边容器 -->
    <el-aside :width="width" class="el-aside">
        <el-menu class="el-menu" 
        :collapse="isCollapse" 
        :collapse-transition="false"
        default-active="/home"
        router="true">
            <h3 v-if="!isCollapse">bgStoreMGTSys</h3>
            <h3 v-else>bgSys</h3>
            <el-menu-item
                v-for="item in noChildren"
                :index="item.path" 
                :key="item.path"
            >
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu
                v-for="item in hasChildren"
                :index="item.path" 
                :key="item.path"
                
            >   
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                    v-for="(subItem,subIndex) in item.children"
                    :index="subItem.path" 
                    :key="subItem.path"
                    >
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>

            </el-sub-menu>
      </el-menu>

    </el-aside>

</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'; 
    import { useAllDataStore } from '@/stores';
    const list = ref([
        {
            path: '/home', name: 'home', label: '首页', icon: 'house', url: 'Home'
        },
        {
            path: '/mall', name: 'mall', label: '商品管理', icon: 'video-play', url: 'Mall'
        },
        {
            path: '/user', name: 'user', label: '用户管理', icon: 'user', url: 'User'
        },
        {
            path: '/other', name: 'home', label: '其他', icon: 'location', url: 'home',
            children: [
                {
                    path: '/page1', name: 'page1', label: '页面1', icon: 'setting', url: 'Page1'
                },
                {
                    path: '/page2', name: 'page2', label: '页面2', icon: 'setting', url: 'Page2'
                }
            ]
        }
        ])
    const stores = useAllDataStore();
    const noChildren = computed( () => list.value.filter( item => !item.children))
    const hasChildren = computed( () => list.value.filter( item => item.children))
    let isCollapse = computed(() => stores.state.isCollapse);
    let width = computed(()=>stores.state.isCollapse ? '64px' : '180px')
</script>

<style scoped lang="less">
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
.el-aside{
    height: 100%;
    background-color: #545c64;

}
.el-menu{
    // 背景颜色
    --el-menu-bg-color: #545c64;
    // 字体颜色
    --el-menu-text-color:#fff;
}
</style>