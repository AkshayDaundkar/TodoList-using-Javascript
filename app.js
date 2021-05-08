const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo")

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filtertodo);

//function
function addTodo(event){
    //prevent from submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create List
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton =document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    // trash button

    const trashButton =document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // TO-Do append to List
    todoList.appendChild(todoDiv);

    //clear to do input value
    todoInput.value="";

}

//deldete chcek functoion

function deleteCheck(e){
    const item =e.target;
    //Delete Todo
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove(); 
        });
    }

    //check mark
    if(item.classList[0]==='completed-btn'){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
     }
}


function filtertodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';  
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';  
                }
                else{
                    todo.style.display="none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo){

    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){

    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
    
        //Create List
        const newTodo = document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        //check mark button
        const completedButton =document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>'
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        // trash button
    
        const trashButton =document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        // TO-Do append to List
        todoList.appendChild(todoDiv);
    
    });
}

function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}