fetch("chores.json")
  .then((res) => res.json())
  .then((data) => {
    const adamList = document.getElementById("adamList");
    const arielList = document.getElementById("arielList");

    data.chores.forEach((chore, index) => {
      const li = document.createElement("li");
      li.className = chore.completed ? "completed" : "";

      li.innerHTML = `
        <span><strong>${chore.task}</strong></span>
        <button onclick="markComplete(this, ${index})">
          ${chore.completed ? "Undo" : "Complete"}
        </button>
      `;

      if (chore.assignedTo === "Adam") {
        adamList.appendChild(li);
      } else if (chore.assignedTo === "Ariel") {
        arielList.appendChild(li);
      }
    });

    window.markComplete = (btn, index) => {
      const li = btn.parentElement;
      li.classList.toggle("completed");
      btn.innerText = li.classList.contains("completed") ? "Undo" : "Complete";
    };
  });
