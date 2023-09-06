const textInput = document.querySelector('.textinput');
const tasklist = document.querySelector('.myul');
let taskItems = document.querySelectorAll('li'); 
const deletedTasks = new Set();

var addButton = document.querySelector('.add').addEventListener('click', function () {
    const taskInputValue = textInput.value.trim();

    if (taskInputValue !== '') {
        addTaskToList(taskInputValue);

        textInput.value = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskInputValue);
        saveTasksToLocalStorage(tasks);

        
        taskItems = document.querySelectorAll('li');
    }
});

function addDeleteListener(button, taskText) {
    button.addEventListener('click', function () {
        const taskItem = button.parentElement;

        
        if (tasklist.contains(taskItem)) {
            tasklist.removeChild(taskItem);
            deletedTasks.add(taskText); 

            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(updatedTasks);

            
            taskItems = document.querySelectorAll('li');
            taskItems.forEach((taskItem, index) => {
                const deleteButton = taskItem.querySelector('button');
                addDeleteListener(deleteButton, taskItem.querySelector('.task-text').textContent);
                taskItem.querySelector('.task-number').textContent = `${index + 1}. `;
            });
        }
    });

   
    if (deletedTasks.has(taskText)) {
        button.classList.add('deleted');
    }
}


taskItems.forEach((taskItem, index) => {
    const deleteButton = taskItem.querySelector('button');
    const taskText = taskItem.querySelector('.task-text').textContent;
    addDeleteListener(deleteButton, taskText);
    taskItem.querySelector('.task-number').textContent = `${index + 1}. `;
});

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (!deletedTasks.has(task)) {
            addTaskToList(task);
        }
    });
}

function addTaskToList(taskText) {
    const taskItem = document.createElement('li');
    const taskButton = document.createElement('button');
    const taskNumber = document.createElement('span');
    const taskTextSpan = document.createElement('span');

    taskItem.appendChild(taskNumber);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(taskButton);

    taskButton.innerHTML = 'x';
    taskNumber.textContent = `${tasklist.children.length + 1}. `;
    taskTextSpan.textContent = taskText;

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('crossed');
    });

    tasklist.appendChild(taskItem);

   

    
    addDeleteListener(taskButton, taskText);
}

 taskItems.forEach(item => {
        item.addEventListener('click',() => {
            item.classList.toggle('crossed')
        } )
    })
    
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
