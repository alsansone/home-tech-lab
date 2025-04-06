fetch("chores.json")
  .then((res) => res.json())
  .then((data) => {
    const adamList = document.getElementById("adamList");
    const arielList = document.getElementById("arielList");

    data.chores.forEach((chore, index) => {
      const li = document.createElement("li");
      li.className = chore.completed ? "completed" : "";

      li.innerHTML = `
      <div class="chore-text">
        <strong>${chore.task}</strong><br />
        <button onclick="markComplete(this, ${index})">
          ${chore.completed ? "Undo" : "Complete"}
        </button>
        <button onclick="triggerUpload(this)">📷 Upload Photo</button>
        <input type="file" accept="image/*" style="display:none;" onchange="previewImage(this)" />
        <div class="preview-container"></div>
      </div>
    `;

      if (chore.assignedTo === "Adam") {
        adamList.appendChild(li);
      } else if (chore.assignedTo === "Ariel") {
        arielList.appendChild(li);
      }
    });

    window.triggerUpload = function (btn) {
      const input = btn.nextElementSibling;
      input.click();
    };
    
    window.previewImage = function (input) {
      const file = input.files[0];
      if (!file) return;
    
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = input.nextElementSibling;
        preview.innerHTML = `<img src="${e.target.result}" class="preview-img" />`;
      };
      reader.readAsDataURL(file);
    };

    window.markComplete = (btn, index) => {
      const li = btn.parentElement;
      li.classList.toggle("completed");
      btn.innerText = li.classList.contains("completed") ? "Undo" : "Complete";
    };
  });
