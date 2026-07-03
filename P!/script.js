// Select Elements
const taskInput = document.querySelector("#taskInput");
const categorySelect = document.querySelector("#categorySelect");
const taskList = document.querySelector(".task-list");
const form = document.querySelector(".task-form");

const totalTask = document.querySelector("#totalTask");
const pendingTask = document.querySelector("#pendingTask");
const completedTask = document.querySelector("#completedTask");

const themeBtn = document.querySelector("#themeBtn");

const taskPage = document.querySelector("#taskPage");
const attributePage = document.querySelector("#attributePage");
const pipelinePage = document.querySelector("#pipelinePage");
const eventPage = document.querySelector("#eventPage");

//side bar
const taskLink = document.querySelector("#taskLink");
const attributeLink = document.querySelector("#attributeLink");
const pipelineLink = document.querySelector("#pipelineLink");
const eventLink = document.querySelector("#eventLink");




let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <div class="task-card">
        <input type="checkbox"
               class="task-check"
               ${task.completed ? "checked" : ""}
               onclick="toggleComplete(${index})">

        <div class="task-info">
          <h3 class="${task.completed ? "completed" : ""}">
            ${task.name}
                </h3>
        </div>

        <span class="category">${task.category}</span>

        <div class="action-btns">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
          <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
        </div>
      </div>
    `;
  });

  totalTask.textContent = tasks.length;
  pendingTask.textContent = tasks.filter(t => !t.completed).length;
  completedTask.textContent = tasks.filter(t => t.completed).length;
}

// Add
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = taskInput.value.trim();
  const category = categorySelect.value;

  if (name === "" || category === "") {
    alert("Please enter task and select category!");
    return;
  }

  tasks.push({
    name: name,
    category: category,
    completed: false
  });

  taskInput.value = "";
  categorySelect.value = "";

  renderTasks();
});

// Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Complete / Undo Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit Task
function editTask(index) {
  taskInput.value = tasks[index].name;
  categorySelect.value = tasks[index].category;

  tasks.splice(index, 1);
  renderTasks();
}

//all page 

function hidePage() {
  taskPage.style.display = "none";
  attributePage.style.display = "none";
  pipelinePage.style.display = "none";
  eventPage.style.display = "none";
}

taskLink.addEventListener("click", (e) => {
  e.preventDefault();

  hidePage();
  taskPage.style.display = "block";
});

attributeLink.addEventListener("click", (e) => {
  e.preventDefault();

  hidePage();
  attributePage.style.display = "block";
});

pipelineLink.addEventListener("click", (e) => {
  e.preventDefault();

  hidePage();
  pipelinePage.style.display = "block";
});

eventLink.addEventListener("click", (e) => {
  e.preventDefault();

  hidePage();
  eventPage.style.display = "block";
});


// Dark Mode
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
  }
}

themeBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");

  if (currentTheme === "light") {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
    themeBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});




// Attribute vs Property Demo
const demoInput = document.querySelector("#demoInput");
const result = document.querySelector(".result");

const showAttribute = document.querySelector("#showAttribute");
const showProperty = document.querySelector("#showProperty");
const changeProperty = document.querySelector("#changeProperty");
const changeAttribute = document.querySelector("#changeAttribute");

if (
  demoInput &&
  result &&
  showAttribute &&
  showProperty &&
  changeProperty &&
  changeAttribute
) {
  showAttribute.addEventListener("click", () => {
    result.innerHTML = `
      <h3>Attribute Value</h3>
      <p>${demoInput.getAttribute("value")}</p>
    `;
  });

  showProperty.addEventListener("click", () => {
    result.innerHTML = `
      <h3>Property Value</h3>
      <p>${demoInput.value}</p>
    `;
  });

  changeProperty.addEventListener("click", () => {
    demoInput.value = "Changed by Property";

    result.innerHTML = `
      <h3>Property Changed</h3>
      <p>Input ki current value change ho gayi.</p>
    `;
  });

  changeAttribute.addEventListener("click", () => {
    demoInput.setAttribute("value", "Changed by Attribute");
    demoInput.value = demoInput.getAttribute("value");

    result.innerHTML = `
    <h3>Attribute Changed</h3>
    <p>HTML attribute value change ho gayi.</p>
  `;
  });
}