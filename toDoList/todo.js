function addItems(){
    var enter = document.querySelector('#inputContent');
    var list_container = document.querySelector('#list-container');
    if(enter.value.trim() === ''){ // 如果没有输入待办事项
        alert('Please enter the to-do items.');
        return;
    }
    
    // 创建容器
    var perListBox = document.createElement('div');
    perListBox.className = 'list-item';

    // 创建复选框
    var input = document.createElement('input');
    input.type = 'checkbox';

    // 创建关联标签
    var label = document.createElement('label');
    label.textContent = enter.value;

    // 创建删除按钮
    var del = document.createElement('span');
    del.className = 'del-btn';
    del.textContent = '×';
    del.onclick = function() {
        perListBox.remove();
    };

    // 事件绑定
    input.onchange = function() {
        finishList(this);
    };


    // 组装元素
    perListBox.appendChild(input);
    perListBox.appendChild(label);
    perListBox.appendChild(del);
    list_container.appendChild(perListBox);
    // 清除输入框
    enter.value = '';
    
}
function finishList(checkbox){
    var label = checkbox.parentElement.querySelector('label');
    label.classList.toggle('strike-through',checkbox.checked);
}