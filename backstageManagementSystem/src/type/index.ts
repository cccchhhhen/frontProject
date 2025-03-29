import type { ComponentPublicInstance } from "vue";
// import type { RouteRecordRaw } from "vue-router";
// export type routeItem = RouteRecordRaw & {
//     label: string,
//     icon: string,
// }
export interface routeItem{
    path: string,
    name: string,
    label: string,
    icon: string,
    url: string,
    component?: () => Promise<ComponentPublicInstance>;
    // 这是一个函数类型，它返回一个 Promise，该 Promise 解析为 Vue 组件的公共实例
    children?: routeItem[],
    // redirect: string,
    (key: string): string,
}