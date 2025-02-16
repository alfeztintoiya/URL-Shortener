document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-theme");
    const body = document.body;

    // Check localStorage for theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Toggle theme on button click
    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
