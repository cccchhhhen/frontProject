import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name:'login',
        path:'/login',
        component:() => import("@/components/Login.vue")
    },
    {
        name:'reg',
        path:'/reg',
        component:() => import("@/components/Reg.vue")
    },
    {
        name:'accountList',
        path:'/accountList',
        component:() => import("@/components/AccountList.vue"),
        // meta: { requiresAuth: true } // 16. 需要鉴权的路由标记
    },
    {
        name:'createAccount',
        path:'/createAccount',
        component:() => import("@/components/CreateAccount.vue"),
        // meta: { requiresAuth: true } // 16. 需要鉴权的路由标记
    },
    {
        path:'/.pathMatch(.*)*',
        component: () => import('@/components/NotFound.vue')
    },
    {
        path: '/',
        redirect: '/login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to) => {
//     const token = localStorage.getItem('chen_token')
    
//     // 17. 路由鉴权逻辑
//     if (to.meta.requiresAuth && !token) {
//       return '/login' // 18. 重定向到登录页
//     }
    
//     if (to.path === '/login' && token) {
//       return '/accountList' // 19. 已登录用户禁止访问登录页
//     }
// })
  

export default router;