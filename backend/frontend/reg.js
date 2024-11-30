// Handle Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! You are now an admin.');
            window.location.href = 'login.html'; // Redirect to login
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        alert(error.message);
    }
});
