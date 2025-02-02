// Wait for the DOM to load before setting up event listeners
window.onload = function() {
    // Get the form element and handle its submit event
    const form = document.getElementById('register');
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values entered by the user in the form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send the registration data to the backend
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }) // Sending the user data
        });

        const data = await response.json(); // Get the response from the backend
        if (data.message === 'User registered successfully!') {
            alert('Registration successful!');
            window.location.href = '../index.html';  // Automatically redirect to the login page after successful registration
        } else {
            alert('Error: ' + data.message);  // Show error message if registration fails
        }
    });
};