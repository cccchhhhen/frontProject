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
                {
                    path:'/home',
                    name:'home',
                    component:() => import('@/components/Home.vue')
                }
            ]
        }
    ]
})

export default router;