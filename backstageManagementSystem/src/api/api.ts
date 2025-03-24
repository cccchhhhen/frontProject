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
            // mock: false
        });
    },
    getCountData(){
        return request ({
            url:'/api/home/getCountData',
            method: 'get',
        });
    }
}