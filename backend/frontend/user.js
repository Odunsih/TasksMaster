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




// Fetch and display user profile
async function fetchUserProfile() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/profile', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        document.getElementById('name').value = data.name || ''; // Populate name field
    } catch (error) {
        alert(`Error fetching profile: ${error.message}`);
    }
}

// Update user profile
document.getElementById('update-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }
    } catch (error) {
        alert(`Error updating profile: ${error.message}`);
    }
});

// Fetch profile details on page load
fetchUserProfile();


// Fetch tasks on page load
// fetchTasks();



function searchTasks() {
    const query = document.getElementById('search-input').value.toLowerCase();

    // Filter tasks by title or description
    const filteredTasks = allTasks.filter(task =>
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
    );

    displayTasks(filteredTasks); // Update the displayed list
}
