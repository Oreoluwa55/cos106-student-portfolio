const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskCourseInput = document.getElementById("task-course");
const taskDateInput = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");

// Initialize array with saved tasks or default Miva coursework tasks
let tasks = JSON.parse(localStorage.getItem("mivaAcademicTasks")) || [
  {
    id: 1,
    title: "Complete COS 106 Responsive Portfolio & Planner Website",
    course: "COS 106",
    dueDate: "2026-11-30",
    completed: false
  },
  {
    id: 2,
    title: "Review Python & SQL Data Manipulation Exercises",
    course: "COS 102",
    dueDate: "2026-12-04",
    completed: true
  }
];

function saveTasks() {
  localStorage.setItem("mivaAcademicTasks", JSON.stringify(tasks));
}

function updateCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining (${tasks.length} total)`;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<li class="card">No academic tasks yet. Add your next Miva assignment above.</li>`;
    updateCounter();
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `
      <span class="task-text"><strong>${task.title}</strong></span>
      <span class="task-meta">Course: ${task.course} • Due: ${task.dueDate}</span>
    `;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.type = "button";
    completeBtn.className = "btn-sm btn-complete";
    completeBtn.textContent = task.completed ? "Undo" : "Mark Complete";
    completeBtn.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-sm btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });

  updateCounter();
}

function addTask(event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const course = taskCourseInput.value;
  const dueDate = taskDateInput.value;

  if (!title || !dueDate) return;

  const newTask = {
    id: Date.now(),
    title,
    course,
    dueDate,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", addTask);
renderTasks();