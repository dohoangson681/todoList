import TaskList from "./TaskList.js";
import Task from "./Task.js";
let taskList = new TaskList() ; 
const activity = document.getElementById("newTask") ; 
const todoList = document.getElementById("todo") ; 
const completedTask = document.getElementById("completed") ;
let titleDefault = ()=>{
    let currenDate = new Date() ; 
    document.getElementById("current-date").innerHTML = `${currenDate.getFullYear()}-${currenDate.getMonth() + 1}-${currenDate.getDate()}` ;
    document.getElementById("todoTask").innerHTML = "My Tasks" ;  
}
titleDefault() ; 
let showTask = (arr) =>{
    let contentTask = "" ; 
    let contentTaskDone = "" ; 
    arr.map((taksObject , index)=>{
        if(taksObject.status == 0){
            contentTask += `
            <li class="d-flex justify-content-between">
            <p class="m-0">${taksObject.taskName}</p>
            <div class="task-buttons">
                <button onclick = "checkTaskDone(${index})" class="btn-task">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button onclick = "deleteTask(${index})" class="btn-task">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button onclick = "taskDetails(${index})" class="btn-task">
                    <i id="icon_detail_task" class="fa-solid fa-eye "></i>
                </button>
            </div>
        </li>
            ` ; 
        }else {
            contentTaskDone += `
            <li class="d-flex justify-content-between">
                            <p class="m-0">${taksObject.taskName}</p>
                            <div class="task-buttons">
                                <button class="btn-task"><i class="fa-solid fa-check"></i></button>
                                <button onclick = "deleteTask(${index})" class="btn-task">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                            </div>
            </li>
            ` ; 
        }
       
    })
    todoList.innerHTML = contentTask ; 
    document.getElementById("completed").innerHTML = contentTaskDone ; 
}
let setLocalStorage = (arr) => {
    localStorage.setItem("My Todo List" , JSON.stringify(arr)) ; 
}
let getLocalStorage = () => {
    if(localStorage.getItem("My Todo List") != null){
       taskList.taskArray =  JSON.parse(localStorage.getItem("My Todo List")) ; 
       showTask(taskList.taskArray) ; 
    }else {
        taskList.taskArray = [] ; 
    }
}
getLocalStorage() ;
let resetForm = () => {
    document.getElementById("newTask").value = "" ; 
    document.getElementById("deadline").value = "" ; 
} 
let addNewTask = () =>{
    let taskName = activity.value ; 
    let taskDeadline = document.getElementById("deadline").value ; 
    let status = 0 ; // not done yet
    // console.log(taskName , " " , taskDeadline , " " , status) ;
    if(taskName.trim() != "" && taskDeadline != ""  ){
        let taksObject = new Task(taskName , taskDeadline , status )  ;
    taskList.addTask(taksObject) ; 
    // console.log(taskList.taskArray) ; 
    showTask(taskList.taskArray) ; 
    setLocalStorage(taskList.taskArray) ;
    resetForm() ;  
    }else {
        alert("Chưa điền đủ các trường thông tin !") ; 
    }
    
}
document.getElementById("addItem").addEventListener("click" , ()=>{
    addNewTask() ; 
})
let taskDetails = (index)=>{
    let taskObject = taskList.taskArray[index] ; 
    document.getElementById("todoTask").innerHTML = `${taskObject.taskName}` ; 
    document.getElementById("current-date").innerHTML = `Deadline : ${taskObject.taskDeadline}` ;
}
window.taskDetails = taskDetails ; 
let deleteTask = (index) => {
    taskList.deleteTask(index) ; 
    showTask(taskList.taskArray) ; 
    setLocalStorage(taskList.taskArray) ; 
    titleDefault() ; 
}
window.deleteTask = deleteTask ; 

let checkTaskDone = (index) => {
    let taskObject = taskList.taskArray[index] ; 
    taskObject.status = 1 ; 
    showTask(taskList.taskArray) ; 
    setLocalStorage(taskList.taskArray) ;
    titleDefault() ;  
}
window.checkTaskDone = checkTaskDone ; 
let sortAtoZ = () => {
    let sortArrayAtoZ = [] ; 
    taskList.taskArray.map((taskObject)=>{
        if(taskObject.status == 0  ){
            sortArrayAtoZ.push(taskObject) ; 
        }
    }) ;
    for(let i = 0 ; i < sortArrayAtoZ.length ; i++){
        for(let j = 0 ; j < sortArrayAtoZ.length - i - 1 ; j++){
            if(sortArrayAtoZ[j].taskName > sortArrayAtoZ[j+1].taskName){
                let tmp = sortArrayAtoZ[j] ; 
                sortArrayAtoZ[j] = sortArrayAtoZ[j+1] ; 
                sortArrayAtoZ[j+1] = tmp ; 
            }
        }
    }
    showTask(sortArrayAtoZ) ; 

}
document.getElementById("two").onclick = sortAtoZ ; 
let sortZtoA = () => {
    let sortArrayZtoA = [] ; 
    taskList.taskArray.map((taskObject)=>{
        if(taskObject.status == 0  ){
            sortArrayZtoA.push(taskObject) ; 
        }
    }) ;

    for(let i = 0 ; i < sortArrayZtoA.length ; i++){
        for(let j = 0 ; j < sortArrayZtoA.length - i - 1 ; j++){
            if(sortArrayZtoA[j].taskName < sortArrayZtoA[j+1].taskName){
                let tmp = sortArrayZtoA[j] ; 
                sortArrayZtoA[j] = sortArrayZtoA[j+1] ; 
                sortArrayZtoA[j+1] = tmp ; 
            }
        }
    }
    showTask(sortArrayZtoA) ; 
}
document.getElementById("three").onclick = sortZtoA ;
document.getElementById("one").addEventListener("click" , () => {
    showTask(taskList.taskArray) ; 
    titleDefault() ;
})
 
