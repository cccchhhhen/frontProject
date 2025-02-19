// 判断浏览器是否支持本地存储
if(!window.localStorage) {
    alert('不支持本地存储!');
    // return false;
}
else{
    localStorage.clear();
    console.log('支持本地存储');
}
var enter = document.querySelector('#input-box');
var list_container = document.querySelector('#list-container');
var status_select = document.querySelector('#status-select');
var datatime_local = document.querySelector('input[type="datetime-local"]');
const pre = 'toDoList ';
toDoListInit();
function toDoListInit(){
    if(localStorage.length>0){
        for(let i=0;i<localStorage.length;i++){
            if(localStorage.key(i).slice(0,pre.length) === pre){
                createItem(localStorage.key(i));
            }
        }
    }
}

// 添加待办事项
function addItems(){
    if(enter.value.trim() === ''){ // 如果没有输入待办事项
        alert('Please enter the to-do items.');
        return;
    }
    let key = pre + new Date().valueOf();
    // console.log('datatime_local',datatime_local.value);
    
    let value = {'value':`${enter.value}   ${datatime_local.value}`};
    const remainderTime = new Date(datatime_local.value);
    setRemainder(enter.value,remainderTime);
    // key = pre + key;
    localStorage.setItem(key,JSON.stringify(value));
    createItem(key,datatime_local.value);
    status_select.options[0].selected = true;
    filterItems('all');
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
    if(newValue.checked === undefined){
        Object.assign(newValue,{'checked':false});
    }
    input.checked = newValue.checked;
    if(input.checked){
        label.classList.add('strike-through');
    }
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
    datatime_local.value = '';
}

// 切换复选框状态(勾选、不勾选)
function toggleList(key,checkbox){
    let value = JSON.parse(localStorage.getItem(key));
    value.checked = !value.checked;
    localStorage.setItem(key,JSON.stringify(value));
    var label = checkbox.parentElement.querySelector('label');
    label.classList.toggle('strike-through',checkbox.checked);
}

// 切换状态
function filterItems(status){
    list_container.replaceChildren();
    if(localStorage.length>0){
        for(let i=0;i<localStorage.length;i++){
            let key = localStorage.key(i);
            if(key.slice(0,pre.length) === pre){
                let value = JSON.parse(localStorage.getItem(key));
                if(status === 'finished' && value.checked === true){
                    createItem(key);
                }
                else if(status === 'unfinished' && value.checked === false){
                    createItem(key);
                }
                else if(status === 'all'){
                    createItem(key);
                }                
            }
        }
    }

}

function setRemainder(value,remainderTime){
    const currentTime = new Date();
    let timeDiff =  remainderTime.getTime() - currentTime.getTime();
    if(timeDiff>0){
        setTimeout(() => {
            alert(`提醒：${value}时间到了`);
        },timeDiff);
    }
    else{
        console.log('提醒时间已过');
    }
}