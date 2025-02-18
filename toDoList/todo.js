// 判断浏览器是否支持本地存储
if(!window.localStorage) {
    alert('不支持本地存储!');
    // return false;
}
else{
    localStorage.clear();
    console.log('支持本地存储');
}
var enter = document.querySelector('#inputBox');
var list_container = document.querySelector('#list-container');
const pre = 'toDoList ';

toDoListInit();
function toDoListInit(){
    // var flag = true;
    if(localStorage.length>0){
        for(let i=0;i<localStorage.length;i++){
            if(localStorage.key(i).slice(0,pre.length) === pre){
                createItem(localStorage.key(i));
            }
        }
    }
}
function addItems(){
    if(enter.value.trim() === ''){ // 如果没有输入待办事项
        alert('Please enter the to-do items.');
        return;
    }
    let key = pre + new Date().valueOf();
    let value = {'value':enter.value};
    
    localStorage.setItem(key,JSON.stringify(value));
    createItem(key);
}
function createItem(key){
    // 创建容器
    var perListBox = document.createElement('div');
    perListBox.className = 'list-item';

    // 创建复选框
    var input = document.createElement('input');
    input.type = 'checkbox';

    // 创建关联标签
    var label = document.createElement('label');
    label.textContent = JSON.parse(localStorage.getItem(key)).value;

    // 创建删除按钮
    var del = document.createElement('span');
    del.className = 'del-btn';
    del.textContent = '×';
    del.onclick = function() {
        localStorage.removeItem(key);
        perListBox.remove();
    };

    let newValue = JSON.parse(localStorage.getItem(key));
    // console.log('newKey1',newKey);
    Object.assign(newValue,{'checked':false});
    // console.log('newKey',newKey);
    localStorage.setItem(key,JSON.stringify(newValue))
    // 复选框事件绑定
    input.onchange = function() {
        toggleList(key,this);
    };

    // 组装元素
    perListBox.appendChild(input);
    perListBox.appendChild(label);
    perListBox.appendChild(del);
    list_container.appendChild(perListBox);
    // 清除输入框
    enter.value = '';
}

// 切换复选框状态(勾选、不勾选)
function toggleList(key,checkbox){
    let value = JSON.parse(localStorage.getItem(key));
    // console.log('checked',checked);
    value.checked = !value.checked;
    
    // let status = !localStorage.key.checked;
    localStorage.setItem(key,JSON.stringify(value));
    var label = checkbox.parentElement.querySelector('label');
    label.classList.toggle('strike-through',checkbox.checked);
}

