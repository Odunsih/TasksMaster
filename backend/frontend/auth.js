// Handle Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', data.token); // Save token (if any)
            
            // Check role and redirect
            if (data.role === 'admin') {
                window.location.href = 'admin.html'; // Redirect to admin dashboard
            } else if (data.role === 'user') {
                window.location.href = 'user.html'; // Redirect to user dashboard
            } else {
                throw new Error('Invalid role');
            }
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        alert(error.message);
    }
});


// // Handle Registration
// document.getElementById('register-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:8000/api/v1/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, email, password }),
//         });

//         const data = await response.json();
        
//         if (response.ok) {
//             alert('Registration successful!');
//             window.location.href = 'login.html'; // Redirect
//         } else {
//             throw new Error(data.message || 'Registration failed');
//         }
//     } catch (error) {
//         alert(error.message);
//     }
// });
