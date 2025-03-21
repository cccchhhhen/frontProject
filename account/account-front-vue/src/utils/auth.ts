// src/utils/auth.js
// 处理 token
export const setToken = (token:string) => sessionStorage.setItem('token',token);

export const getToken = () => sessionStorage.getItem('token');

export const removeToken = () => sessionStorage.removeItem('token');