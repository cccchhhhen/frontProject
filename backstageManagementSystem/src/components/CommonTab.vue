<template>
    <div class="tags">
        <el-tag
        v-for="(tag, index) in tags"
        :key="tag.name"
        :closable="tag.name!=='home'"
        :effect="route.name === tag.name ? 'dark' : 'plain'"
        @click='handleMenu(tag)'
        @close="handleClose(tag,index)">
        {{ tag.label }}
        </el-tag>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAllDataStore } from '@/stores'
import { useRouter } from 'vue-router';
const router = useRouter();
const store = useAllDataStore();
const route = useRoute();
const tags = computed(()=>store.state.tags)
const handleMenu = (tag: any) => {
    router.push(tag.name);
    store.selectMenu(tag);
}
const handleClose =(tag: any,index: any) => {
    store.updateTags(tag);
    // 关闭非当前页面
    if(tag.name != route.name) return 
    if(index === store.state.tags.length){
        store.selectMenu(tags.value[index-1]);
        router.push(tags.value[index-1].name);
    }
}
</script>
<style scoped lang="less">
.tags{
    margin: 20px 0;
}
.el-tag{
    margin: 0 10px;
}
</style>