// src/api/index.ts

// define interface function
import axios from "@/utils/request";

// login interface
export const userLogin = (data:any) => axios.post('login',data);

// reg interface
export const userReg = (data:any) => axios.post('reg', data);

// get account list interface
export const getAccountInter = () => axios.get('account-list');

// create account interface
export const createAccount = (data:any) => axios.post('create-account', data);