

async function loadTasks() {
    const response = await fetch('http://localhost:8000/api/v1/tasks'); // Assuming you have an endpoint for tasks
    const tasks = await response.json();
 
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
 
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.innerHTML = <p>${task.title}</p>; // Display task title
        taskList.appendChild(div);
    });
 }
 
 // Call loadTasks on page load
 document.addEventListener('DOMContentLoaded', loadTasks);
 