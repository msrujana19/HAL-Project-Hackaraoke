// app.js

document.getElementById("graphs-link").addEventListener("click", function() {
    showSection("graphs");
  });
  
  document.getElementById("cycles-link").addEventListener("click", function() {
    showSection("cycles");
  });
  
  document.getElementById("privacy-link").addEventListener("click", function() {
    showSection("privacy");
  });
  
  document.getElementById("help-link").addEventListener("click", function() {
    showSection("help");
  });
  
  document.getElementById("about-link").addEventListener("click", function() {
    showSection("about");
  });
  
  function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
      section.style.display = 'none';
    });
  
    // Show the clicked section
    const sectionToShow = document.getElementById(sectionId);
    sectionToShow.style.display = 'block';
  }
  