document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const dueDate = document.getElementById("taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (!title) {
        alert("Please enter a task title!");
        return;
    }

    const task = { title, dueDate, priority, completed: false };
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    document.getElementById("taskTitle").value = "";
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const newTitle = prompt("Edit task title", tasks[index].title);
    if (newTitle !== null) {
        tasks[index].title = newTitle.trim() || tasks[index].title;
        saveTasks(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    getTasks().forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>
                ${task.title} (${task.priority})
                ${task.dueDate ? `- Due: ${task.dueDate}` : ""}
            </span>
            <div>
                <button class="task-btn complete-btn" onclick="toggleTask(${index})">✔</button>
                <button class="task-btn edit-btn" onclick="editTask(${index})">✏️</button>
                <button class="task-btn delete-btn" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function loadTasks() {
    renderTasks();
}
