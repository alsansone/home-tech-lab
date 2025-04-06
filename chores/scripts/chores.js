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
      const preview = input.nextElementSibling;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeMB = 2;
    
      // Reset preview
      preview.innerHTML = "";
    
      if (!file) return;
    
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        preview.innerHTML = `<p style="color: red;">❌ Invalid file type. Please upload a JPG, PNG, or GIF.</p>`;
        input.value = ""; // clear the input
        return;
      }
    
      // Check file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        preview.innerHTML = `<p style="color: red;">❌ File too large. Max size is ${maxSizeMB}MB.</p>`;
        input.value = "";
        return;
      }
    
      // Show image preview
      const reader = new FileReader();
      reader.onload = function (e) {
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
