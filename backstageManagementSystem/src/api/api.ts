/**
 * api 统一管理
 */
import request  from "./request";

// 请求首页左侧表格数据
export default {
    getTableData(){
        return request ({
            url:'/api/home/getTableData',
            method: 'get',
            mock: false
        });
    },
    getCountData(){
        return request ({
            url:'/api/home/getCountData',
            method: 'get',
        });
    },
    getChartData(){
        return request ({
            url:'/api/home/getChartData',
            method: 'get',
        });
    },
    getUserData(params: any) {
        return request({
          url: '/user/getUserData',
          method: 'get',
          data: params
        })
    },
    deleteUser(params: any) {
        return request({
          url: '/user/deleteUser',
          method: 'get',
          data: params
        })
    },
    addUser(params: any) {
        return request({
          url: '/user/addUser',
          method: 'post',
          data: params
        })
    },
    editUser(params: any) {
        return request({
          url: '/user/editUser',
          method: 'post',
          data: params
        })
    },
    getMenu(params: any) {
        return request({
          url: '/permission/getMenu',
          method: 'post',
          data: params
        })
    }
}