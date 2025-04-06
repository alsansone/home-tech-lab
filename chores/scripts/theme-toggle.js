const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark");
  toggleBtn.textContent = "🌙 Dark Mode";
} else {
  body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.onclick = () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};
