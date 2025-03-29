import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'main',
            component: () => import('@/views/Main.vue'),
            redirect:"/home",
            children:[
                // {
                //     path:'home',
                //     name:'home',
                //     component:() => import('@/views/Home.vue')
                // },
                // {
                //     path:'mall',
                //     name:'mall',
                //     component:() => import('@/views/Mall.vue')
                // },
                // {
                //     path:'user',
                //     name:'user',
                //     component:() => import('@/views/User.vue')
                // }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:() => import('@/views/Login.vue')
        }
    ]
})

export default router;