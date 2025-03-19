// src/utils/axios.ts
import axios from 'axios';
import { getToken } from '../utils/auth';
const service = axios.create({
    baseURL:'http://127.0.0.1:9000'
//   baseURL: import.meta.env.VITE_API_URL, // 11. 环境变量配置
//   timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 请求头携带 token 
  const token = getToken(); // 12. 获取存储的 token
  if (token) {
    config.headers['token'] = token; // 13. 自动携带 token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => response, // 14. 直接返回 data 内容
  error => {
    if (error.response?.status === 401) { // 15. 处理 401 未授权
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default service