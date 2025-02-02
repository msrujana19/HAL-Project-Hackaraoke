document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Make sure both fields are filled
    if (email && password) {
      // Send POST request to the backend
      fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })  
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);  // 👀 See what the backend is sending
    
        if (data.success) {
            console.log("Login successful! Redirecting...");
            alert("Login successful! Redirecting...");
            window.location.href = '../index.html';
        } else {
            console.log("Login failed. Server message:", data.message);
            alert(data.message || 'Login failed');
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        alert('Something went wrong. Please try again.');
    });
    } else {
      alert('Please fill in both email and password.');
    }
  });