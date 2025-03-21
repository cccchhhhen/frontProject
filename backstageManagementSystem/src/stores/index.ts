import { defineStore } from "pinia";
import { ref } from "vue";
function initState(){
    return {
        isCollapse: false
    }
}
export const useAllDataStore = defineStore('allDate', () => {
    const state = ref(initState());
    return {
        state
    };
})