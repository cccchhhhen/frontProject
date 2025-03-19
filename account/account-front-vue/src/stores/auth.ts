// src/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('chen_token') || '' // 20. 同步存储状态
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('chen_token', newToken) // 21. 持久化存储
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('chen_token') // 22. 退出登录清理
    }
  },
  getters: {
    isAuthenticated: state => !!state.token // 23. 计算登录状态
  }
})