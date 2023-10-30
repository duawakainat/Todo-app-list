
document.querySelector('#push').onclick = function () {
    const inputField = document.querySelector('.task_input');
    const inputValue = inputField.value;

    if (inputValue.length === 0) {
        alert('Please Enter a Value');
    } else {
        // Create a new task element
        const newTask = document.createElement('div');
        newTask.classList.add('taskadd');
        newTask.innerHTML = `
        <span>${inputValue}</span>
        <button class='delete'><i class="fa-solid fa-trash" style="color: #3d84ff;"></i></button>
      `;

        // Append the new task to the list
        document.querySelector('.taskS_input').appendChild(newTask);

        // Clear the input field
        inputField.value = '';

        // Add a click event listener to the delete button
        const deleteButton = newTask.querySelector('.delete');
        deleteButton.onclick = function () {
            newTask.remove();
            updateLocalStorage();
        }

        // Update local storage
        updateLocalStorage();
    }
}

// Function to update local storage with current task list
function updateLocalStorage() {
    const taskList = document.querySelectorAll('.taskadd span');
    const tasks = [];

    taskList.forEach(function (task) {
        tasks.push(task.textContent);
    });

    localStorage.setItem('todoList', JSON.stringify(tasks));
}

// Function to load tasks from local storage on page refresh
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

            // Add a click event listener to the delete button
            const deleteButton = newTask.querySelector('.delete');
            deleteButton.onclick = function () {
                newTask.remove();
                updateLocalStorage();
            }
        });
    }
}

// Load tasks when the page is refreshed
window.addEventListener('load', loadTasks);
