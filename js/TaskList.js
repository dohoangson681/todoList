export default class TaskList{
    constructor(){
        this.taskArray = [] ;
    }
    addTask(taksObject){
        this.taskArray.push(taksObject) ; 
    }
    deleteTask(index){
        this.taskArray.splice(index,1) ; 
    }
}