
async function fetchMembers() {
    const response = await fetch('http://localhost:8000/api/v1/admin/users', {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    const membersList = document.getElementById('members-list');
    const assignedToSelect = document.getElementById('assignedTo');
    
    data.forEach(user => {
        // Add to team members list
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} (${user.email})`;
        membersList.appendChild(listItem);

        // Add to assign dropdown
        const option = document.createElement('option');
        option.value = user._id;
        option.textContent = user.name;
        assignedToSelect.appendChild(option);
    });
}


// document.getElementById('getTaskButton').addEventListener('click', getTasks);

async function getTasks(event) {
    if (event) event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/v1/tasks', {
            method: 'GET',
            credentials: 'include',
        });

        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear existing tasks

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Unexpected response format: ${contentType}`);
        }

        const data = await response.json();
        const tasks = data.tasks; // Ensure the response format aligns with the backend

        if (Array.isArray(tasks)) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>Title:</strong> ${task.title} <br>
                    <strong>Description:</strong> ${task.description} <br>
                    <strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()} <br>
                    <strong>Status:</strong> <span style="color: ${task.status === 'done' ? 'green' : 'orange'};">${task.status}</span> <br>
                    <strong>Priority:</strong> ${task.priority} <br>
                    <button onclick="editTask('${task._id}')">Edit</button>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                `;
                taskList.appendChild(li);
            });
        } else {
            alert('No tasks found or unexpected response format.');
        }
    } catch (error) {
        alert(`Error fetching tasks: ${error.message}`);
    }
}

// Edit Task
async function editTask(taskId) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    if (newTitle && newDescription) {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                }),
            });

            if (response.ok) {
                alert('Task updated successfully!');
                getTasks(); // Refresh the task list
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update task');
            }
        } catch (error) {
            alert(`Error updating task: ${error.message}`);
        }
    } else {
        alert('Title and description cannot be empty.');
    }
}

// Delete Task
async function deleteTask(taskId) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/task/${taskId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                alert('Task deleted successfully!');
                getTasks();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete task');
            }
        } catch (error) {
            alert(`Error deleting task: ${error.message}`);
        }
    }
}

// Fetch tasks on admin dashboard load
getTasks();




async function handleTaskCreation(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const assignedTo = document.getElementById('assignedTo').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/task/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, dueDate, priority, assignedTo }),
        credentials: 'include',
    });

  const data = await response.json();


    if (response.ok) {
        alert('Task created successfully!');
        document.getElementById('task-form').reset();
    } else {
        alert('Failed to create task');
    }
    } catch (error) {
        alert(error.message);
        
    }
   
}

document.getElementById('task-form').addEventListener('submit', handleTaskCreation);
fetchMembers();


document.getElementById('add-user-form').addEventListener('submit', async (e) => {
e.preventDefault();
const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/admin/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('User added successfully!');
            document.getElementById('add-user-form').reset();
        } else {
            throw new Error(data.message || 'Failed to add user');
        }
    } catch (error) {
        alert(error.message);
    }
});
// document.getElementById('add-user-form').addEventListener('submit', async (event) => {
// event.preventDefault(); // Prevent default form submission



// const email = document.getElementById('email-input').value; // Assuming there's an input with this ID

//     // Simple email validation
//     const emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/;
//     if (!emailPattern.test(email)) {
//         alert('Please enter a valid email address.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:8000/api/v1/admin/add-user', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             body: JSON.stringify({ email }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert('User added successfully!');
//             document.getElementById('add-user-form').reset();
//         } else {
//             throw new Error(data.message || 'Failed to add user');
//         }
//     } catch (error) {
//         console.error('Error:', error); // Log error to console
//         alert(error.message);
//     }
// });
// });




// const taskListElement = document.getElementById('task-list');
// const editTitleInput = document.getElementById('edit-title');
// const editDescriptionInput = document.getElementById('edit-description');
// const updateTaskBtn = document.getElementById('update-task-btn');

// let tasks = [];
// let selectedTaskId = null;

// // Function to fetch tasks from the server
// async function fetchTasks() {
//     const response = await fetch('/tasks', { method: 'GET', headers: { 'Authorization': Bearer ${localStorage.getItem('token')} } });
//     const data = await response.json();
//     tasks = data.data.tasks;
//     renderTasks();
// }

// // Function to render tasks in the UI
// function renderTasks() {
//     taskListElement.innerHTML = '';
//     tasks.forEach(task => {
//         const li = document.createElement('li');
//         li.textContent = ${task.title} - ${task.description};
        
//         // Edit button
//         const editBtn = document.createElement('button');
//         editBtn.textContent = 'Edit';
//         editBtn.onclick = () => openEditTask(task);
        
//         // Delete button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.onclick = () => deleteTask(task._id);
        
//         li.appendChild(editBtn);
//         li.appendChild(deleteBtn);
//         taskListElement.appendChild(li);
//     });
// }

// // Function to open the edit task interface
// function openEditTask(task) {
//     selectedTaskId = task._id;
//     editTitleInput.value = task.title;
//     editDescriptionInput.value = task.description;
// }

// // Function to update a task
// async function updateTask() {
//     if (!selectedTaskId) return;

//     const updatedTask = {
//         title: editTitleInput.value,
//         description: editDescriptionInput.value,
//     };

//     const response = await fetch(/task/${selectedTaskId}, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': Bearer ${localStorage.getItem('token')}
//         },
//         body: JSON.stringify(updatedTask),
//     });

//     if (response.ok) {
//         fetchTasks(); // Refresh the task list
//         clearEditFields();
//     } else {
//         alert('Failed to update task');
//     }
// }

// // Function to delete a task
// async function deleteTask(taskId) {
//     const response = await fetch(/task/${taskId}, {
//         method: 'DELETE',
//         headers: { 'Authorization:' Bearer ${localStorage.getItem('token')} }
//     });

//     if (response.ok) {
//         fetchTasks(); // Refresh the task list
//     } else {
//         alert('Failed to delete task');
//     }
// }

// // Clear edit fields
// function clearEditFields() {
//     selectedTaskId = null;
//     editTitleInput.value = '';
//     editDescriptionInput.value = '';
// }

// // Event listener for update button
// updateTaskBtn.addEventListener('click', updateTask);

// // Initial fetch of tasks
// fetchTasks();


let allTasks = []; // Declare a global variable to hold all tasks

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/tasks', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        allTasks = data.tasks; // Save all tasks globally

        displayTasks(allTasks); // Display tasks initially
    } catch (error) {
        alert(`Error fetching tasks: ${error.message}`);
    }
}

// Function to display tasks dynamically
function displayTasks(tasks) {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = ''; // Clear the task list before appending

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} 
            (Priority: ${task.priority}) 
            <button onclick="markAsDone('${task._id}')">Mark as Done</button>
        `;
        tasksList.appendChild(listItem);
    });
}

// Fetch tasks on page load
fetchTasks();



// search tasks
function searchTasks() {
    const query = document.getElementById('search-input').value.toLowerCase();

    // Filter tasks by title or description
    const filteredTasks = allTasks.filter(task =>
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
    );

    displayTasks(filteredTasks); // Update the displayed list
}
