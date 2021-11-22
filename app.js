//Variables
const addTodoInput = document.querySelector('.add-todo-input');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoList = document.querySelector('.todo-list');
const todoListFilter = document.querySelector('.add-todo-filter');
const todoListArray = [];

//Event listners
document.addEventListener('DOMContentLoaded', showTodoList);
addTodoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', completeDeleteTodo);
todoListFilter.addEventListener('click', filterTodo);

//Create TODO function
function addTodo(event) {
    event.preventDefault();

    if(addTodoInput.value.length == 0) {
        alert('Enter your todo')
    } else {
        //Create new TODO object
        let id = todoListArray.length + 1;
        let title = addTodoInput.value;
        let completed = false;
        let todo = {id, title, completed};
        //Pushing new object to array
        todoListArray.push(todo);
        //Writing added TODO to localstorage
        localStorage.setItem('key', JSON.stringify(todoListArray));
        //Make todo item container
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-list-item');

        //Make todo item container
        const todoItemParagraph = document.createElement('p');
        todoItemParagraph.classList.add('todo-list-item-paragraph');
        todoItemParagraph.innerText = addTodoInput.value;

        //Make "Complete" button
        const todoItemCompleteBtn = document.createElement('button');
        todoItemCompleteBtn.classList.add('todo-list-item-complete-btn', 'fas', 'fa-check');

        //Make "Delete" button
        const todoItemDeleteBtn = document.createElement('button');
        todoItemDeleteBtn.classList.add('todo-list-item-delete-btn', 'fas', 'fa-trash-alt');

        //Add info to container
        todoItem.appendChild(todoItemParagraph);
        todoItem.appendChild(todoItemCompleteBtn);
        todoItem.appendChild(todoItemDeleteBtn);
        todoList.appendChild(todoItem);

        //Clear input after adding TODO
        addTodoInput.value = '';
    }
}

//TODO buttons functions
function completeDeleteTodo(e) {
    const event = e.target;
    //Add todo to complete
    if(event.classList[0] == 'todo-list-item-complete-btn') {
        event.parentElement.classList.toggle('complete');
        todoListArray.forEach(element => {
            if(element.title == event.parentElement.firstChild.innerText) {
                if(element.completed == false) {
                    element.completed = true;
                    localStorage.setItem('key', JSON.stringify(todoListArray));
                } else {
                    element.completed = false;
                    localStorage.setItem('key', JSON.stringify(todoListArray));
                }
            }
        });
    }
    //Delete todo
    if(event.classList[0] == 'todo-list-item-delete-btn') {
        e.target.parentElement.classList.add('deleted');
        e.target.parentElement.addEventListener('transitionend', function() {
            e.target.parentElement.remove();
        });
        let i = 0;
        todoListArray.forEach(element => {
            if(element.title == event.parentElement.firstChild.innerText) {
                todoListArray.splice(i, 1);
                localStorage.setItem('key', JSON.stringify(todoListArray));
            }
            i++;
        })        
    }
}

//Filter TODO 
function filterTodo(e) {
    let todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                if(todo.classList != undefined) {
                    todo.style.display = 'flex';
                }
                break;
            case "completed":
                if(todo.classList != undefined) {
                    if(todo.classList.contains('complete')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none'
                    }
                }
                break;
            case "uncompleted":
                if(todo.classList != undefined) {
                    if(!(todo.classList.contains('complete'))) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none'
                    }
                }
                break;
        }
    });
}

//Show TODOs after page rebooting
function showTodoList() {
    let todos = localStorage.getItem('key');
    if(todos == null) {
        todoListArray=[];
    } else {
        todos = JSON.parse(todos); 
        todos.forEach((element) => {
            //Make todo item container
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-list-item');
            if(element.completed == true) {
                todoItem.classList.add('complete');
            }
            //Make todo 
            const todoItemParagraph = document.createElement('p');
            todoItemParagraph.classList.add('todo-list-item-paragraph');
            todoItemParagraph.innerText = element.title;
            
            //Make "Complete" button
            const todoItemCompleteBtn = document.createElement('button');
            todoItemCompleteBtn.classList.add('todo-list-item-complete-btn', 'fas', 'fa-check');

            //Make "Delete" button
            const todoItemDeleteBtn = document.createElement('button');
            todoItemDeleteBtn.classList.add('todo-list-item-delete-btn', 'fas', 'fa-trash-alt');

            //Add info to container
            todoItem.appendChild(todoItemParagraph);
            todoItem.appendChild(todoItemCompleteBtn);
            todoItem.appendChild(todoItemDeleteBtn);
            todoList.appendChild(todoItem);
            
            todoListArray.push(element);
        })
        //Writing TODO to localstorage after rebooting page
        localStorage.setItem('key', JSON.stringify(todoListArray));
    }
}