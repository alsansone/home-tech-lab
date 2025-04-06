fetch("chores.json")
  .then((res) => res.json())
  .then((data) => {
    const list = document.getElementById("choreList");

    data.chores.forEach((chore, index) => {
      const li = document.createElement("li");
      li.className = chore.completed ? "completed" : "";

      li.innerHTML = `
        <span>
          <strong>${chore.task}</strong> — Assigned to <em>${chore.assignedTo}</em>
        </span>
        <button onclick="markComplete(this, ${index})">
          ${chore.completed ? "Undo" : "Complete"}
        </button>
      `;

      list.appendChild(li);
    });

    window.markComplete = (btn, index) => {
      const li = btn.parentElement;
      li.classList.toggle("completed");
      btn.innerText = li.classList.contains("completed") ? "Undo" : "Complete";
    };
  });
