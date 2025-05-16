document.getElementById("careerForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("form-status");
  
    if (!name || !email || !role || !message) {
      status.style.color = "red";
      status.textContent = "Please fill out all fields.";
      return;
    }
  
    // Simulate successful submission
    status.style.color = "bronw";
    status.textContent = "Thank you! We'll be in touch soon.";
  
    // Optionally clear the form
    this.reset();
  });