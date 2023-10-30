document.querySelector('#push').onclick = function () {
    const inputField = document.querySelector('.task_input');
    const inputValue = inputField.value;

    if (inputValue.length === 0) {
        alert('Please Enter a Value');
    } else {
        const newTask = document.createElement('div');
        newTask.classList.add('taskadd');
        newTask.innerHTML = `
        <span>${inputValue}</span>
        <button class='delete'><i class="fa-solid fa-trash" style="color: #3d84ff;"></i></button>
      `;

        document.querySelector('.taskS_input').appendChild(newTask);

        inputField.value = '';

        const deleteButton = newTask.querySelector('.delete');
        deleteButton.onclick = function () {
            newTask.remove();
            updateLocalStorage();
        }

        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const taskList = document.querySelectorAll('.taskadd span');
    const tasks = [];

    taskList.forEach(function (task) {
        tasks.push(task.textContent);
    });

    localStorage.setItem('todoList', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('todoList');

    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach(function (taskText) {
            const newTask = document.createElement('div');
            newTask.classList.add('taskadd');
            newTask.innerHTML = `
          <span>${taskText}</span>
          <button class='delete'><i class="fa-solid fa-trash" style="color: #3d84ff;"></i></button>
        `;

            document.querySelector('.taskS_input').appendChild(newTask);

            const deleteButton = newTask.querySelector('.delete');
            deleteButton.onclick = function () {
                newTask.remove();
                updateLocalStorage();
            }
        });
    }
}

window.addEventListener('load', loadTasks);
