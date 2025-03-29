import { defineStore } from "pinia";
import { ref, type ComponentPublicInstance } from "vue";
import { type routeItem } from '@/type';
import type { Router } from "vue-router";

function initState(){
    return {
        isCollapse: false,
        tags:[
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menuList: <routeItem[]>[],
        token: '',
        routeList:[]
    }
}

export const useAllDataStore = defineStore('allDate', () => {
    const state = ref(initState());
    function selectMenu(val: any) {
        if(val.name === 'home'){
            state.value.currentMenu = null;
        }else{
            let index = state.value.tags.findIndex(item => item.name === val.name);
            index === -1 ? state.value.tags.push(val) : '' ;
        }
    }
    function updateTags(val: any){
        let index = state.value.tags.findIndex(item=>item.name === val.name);
        state.value.tags.splice(index, 1);
    }
    function updateMenusList(val:routeItem[]){
        state.value.menuList = val;
    }
    function addMenu(router: Router){
        const menu = state.value.menuList;
        const modules = import.meta.glob('../views/**/*.vue');
        const routeArr:routeItem[] = [];
        menu.forEach(item => {
            if(item.children){
                item.children.forEach(val => {
                    // let url = `../views/${item.path}/${val.url}.vue`;
                    let url = `../views/${val.url}.vue`;
                    // console.log('url', url);
                    val.component = modules[url] as () => Promise<ComponentPublicInstance>;
                })
                routeArr.push(...item.children);
            }else{
                let url = `../views/${item.url}.vue`;
                console.log('modules[url]',modules[url]);
                item.component = modules[url] as () => Promise<ComponentPublicInstance>;
                routeArr.push(item);
            }

        })
        console.log('routeArr',routeArr);
        routeArr.forEach(item=>{
          state.value.routeList.push(router.addRoute("main",item))  
        })
    }
    return {
        state,
        selectMenu,
        updateTags,
        updateMenusList,
        addMenu
    };
})