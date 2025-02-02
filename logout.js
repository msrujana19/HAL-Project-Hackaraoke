async function logout() {
    try {
        // Send a POST request to the backend logout endpoint
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
        });

        console.log(response)
        if (response.ok) {
            // Clear client-side storage (localStorage and sessionStorage)
            localStorage.clear();
            sessionStorage.clear();

            // Clear the token cookie (if not already handled by the backend)
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Notify the user and redirect to the login page
            alert("Logged out successfully");
            window.location.href = "login.html"; // Redirect to the login page
        } else {
            console.error('Logout failed:', response.statusText);
            alert("Logout failed. Please try again.");
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert("An error occurred during logout. Please try again.");
    }
}