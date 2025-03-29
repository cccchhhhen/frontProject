import Mock from 'mockjs';
import homeApi from '@/mockData/home';
import userApi from '@/mockData/user';
import permissionApi from '@/mockData/permission';

// 1 url( URL 字符串或 URL 正则) 2 method 3 data
Mock.mock(/api\/home\/getTableData/, 'get', homeApi.getTableData);
Mock.mock(/api\/home\/getCountData/, 'get', homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/, 'get', homeApi.getChartData);
Mock.mock(/user\/getUserData/,"get", userApi.getUserList);
Mock.mock(/user\/deleteUser/,"get", userApi.deleteUser);
Mock.mock(/user\/addUser/,"post", userApi.createUser);
Mock.mock(/user\/editUser/,"post", userApi.updateUser);
Mock.mock(/permission\/getMenu/, "post",permissionApi.getMenu)
