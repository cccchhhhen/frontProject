<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const { proxy } = getCurrentInstance();

import { ref } from "vue";


// 控制对话框是否显示
const dialogVisible = ref(false);
//新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add")
interface userInfoType{
  name:String,
  age:String,
  sex: String,
  birth:String,
  addr: String
}
const formUser = <userInfoType>reactive({})
formUser.sex = '0' ;
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})

const list = ref([])
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
])
//其中total是数据总条数，page是当前的页数，设置name根据name进行条件搜索
const config = reactive({
  total: 0,
  page: 1,
  name: "",
})
const getUserData = async ()=> {
    let data = await proxy.$api.getUserData(config);
    console.log(data);
    list.value = data.list.map((item:any)=>({
        ...item,
        sexLabel: +item.sex === 0 ? '女' : '男'
    }));
    // console.log(list.value)
    config.total = data.count;
    // console.log(config.total)
    
}
onMounted(()=>{
    getUserData();
})
const handleDelete =  (val: any) => {
  ElMessageBox.confirm('你确定要删除吗？').then(async ()=>{
    await proxy.$api.deleteUser({id: val.id});
    // 删除成功提示
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
    // 删除之后重新请求数据
    getUserData();
  })
}
const handleAdd = () => {
  action.value="add"
  //打开对话窗
  dialogVisible.value=true
}
const handleEdit =  (val: any) => {
  action.value = 'edit';
  dialogVisible.value = true;
  
  nextTick(()=>{
    Object.assign(formUser, {...val, sex: ''+val.sex});
  })
}
const changePage =  (page: number) => {
    config.page = page;
    // console.log('page',page)
    getUserData();
}
   
const formInline = reactive({
  keyword: "",
})
const handleSerch = () => {
    config.name = formInline.keyword;
    getUserData();
}
const handleClose = () => {
  dialogVisible.value = false;
  // 表单重置
  proxy.$refs['userForm'].resetFields();
}
const handleCancel = () => {
  dialogVisible.value = false;
  // 表单重置
  proxy.$refs['userForm'].resetFields();
}
const onSubmit = () => {
  proxy.$refs['userForm'].validate(async (valid: any)=> {
    if(valid){
      let res = null;
      if(action.value === 'add'){
        console.log(formUser)
        res = await proxy.$api.addUser(formUser)
      }else if(action.value === 'edit'){
        res = await proxy.$api.editUser(formUser);
      }
      if(res){
        dialogVisible.value = false;
        // 表单重置
        proxy.$refs['userForm'].resetFields();
        getUserData();
      }
    }else{

    }
  })
}
</script>

<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSerch" >搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column 
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width? item.width : '125px'" />
        <el-table-column fixed="right" label="Operations" min-width="120">
        <template #='scope'>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
          编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pager"
        background
        layout="prev, pager, next"
        :total="config.total"
        size="small"
        @current-change="changePage"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '新增用户' : '编辑用户'"
      width="35%"
      :before-close="handleClose"
    >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
      <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formUser.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item class="select-clearn" label="性别" prop="sex">
              <el-select  v-model="formUser.sex" placeholder="请选择">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birth">
              <el-date-picker
                v-model="formUser.birth"
                type="date"
                placeholder="请输入"
                style="width: 100%"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="地址"
            prop="addr"
          >
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-row>
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
</template>

<style scoped lang="less">
.user-header{
    display: flex;
    justify-content: space-between;
}
.table{
  position: relative;
  height: 520px;
  .pager{
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table{
    width: 100%;
    height: 500px;
  }
}
.select-clearn{
  display: flex;
}
</style>