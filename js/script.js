//define element
let task = document.getElementById('task');
let newTask = document.getElementById('new_task');
let addTask = document.getElementById('add_task');
let filterText = document.getElementById('filter_text');
let taskList = document.getElementById('task_list');
let clearTask = document.getElementById('clear_task'); 
//define event listener
task.addEventListener('submit', createTask);
taskList.addEventListener('click',removeTask);
filterText.addEventListener('keyup',filterTask);
clearTask.addEventListener('click',resetAll);
document.addEventListener('DOMContentLoaded',output)
//Define function
function createTask(e){
if(newTask.value===''){
    alert('Empty task')
}else{
    let li = document.createElement('li');
    let link = document.createElement('a');
    li.appendChild(document.createTextNode(newTask.value));
    link.setAttribute('href','#')
    link.innerHTML=' x';
    link.style.textDecoration='none';
    li.appendChild(link);
    taskList.appendChild(li);
    //store in ls
    storeInLs(newTask.value)
    newTask.value='';

}
e.preventDefault();
}
//remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
        confirm('Are you sure');
        let ele = e.target.parentNode;
        ele.remove();
        removeLs(ele);
    }
}
//Filter Task
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(a=>{
        let item = a.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            a.style.display='block';
        }else{
            a.style.display='none'
        }
    })
}
//reset task
function resetAll(e){
while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
}
localStorage.clear();
};
//store in ls
function storeInLs(e){
    let task;
    if(localStorage.getItem('task')===null){
        task = [];
    }else{
        task = JSON.parse(localStorage.getItem('task'));
    }
    task.push(e);
    localStorage.setItem('task',JSON.stringify(task));
}
//output
function output(e){
    let task;
    if(localStorage.getItem('task')===null){
        task = [];
    }else{
        task=JSON.parse(localStorage.getItem('task'))
    }
    task.forEach(a=>{
        let li = document.createElement('li');
        let link = document.createElement('a');
        li.appendChild(document.createTextNode(a));
        link.setAttribute('href','#')
        link.innerHTML=' x';
        link.style.textDecoration='none';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}
//remove from ls
function removeLs(e){
let task;
if(localStorage.getItem('task')===null){
    task=[];
}else{
    task=JSON.parse(localStorage.getItem('task'));
}
let li = e;
li.removeChild(li.lastChild)
task.forEach((a,b)=>{
    if(li.textContent.trim()===a){
        task.splice(b,1);
        localStorage.setItem('task',JSON.stringify(task))
    }
})
}
