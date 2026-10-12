const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;
  if (text.trim() === '') {
    alert("«Введите текст задачи»");
    return;
  }
  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
  }
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  render();
}

function getVisibleTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(t => !t.done);
  }
  if (currentFilter === 'done') {
    return tasks.filter(t => t.done);
  }
  return tasks;
}

function updateCounter() {
  const activeTasksLenght = tasks.filter(t => !t.done).length;
  counter.textContent = "Активных задач: " + activeTasksLenght;
}

function render() {
  const visible = getVisibleTasks();
  list.textContent = '';
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task && task.done == true) {
      li.classList.toggle("done", task.done);
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document.querySelector('.filter.active')?.classList.remove('active');
    btn.classList.add("active");
    render();
  });
});

render();
