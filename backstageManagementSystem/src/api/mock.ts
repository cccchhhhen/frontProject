import Mock from 'mockjs';
import homeApi from '@/mockData/home'
// 1 url( URL 字符串或 URL 正则) 2 method 3 data
Mock.mock(/api\/home\/getTableData/, 'get', homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, 'get', homeApi.getCountData);