let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const formBtn = document.querySelector("#form-btn");
const taskCount = document.querySelector("#task-count");
const completeCount = document.querySelector("#complete-count");
const emptyTodo = document.querySelector("#empty-todo");
const cancelEdit = document.querySelector("#cancel-edit");
const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector("#progress-bar");
const progressMessage = document.querySelector("#progress-message");
const errorMsg = document.querySelector("#errorMsg");
const themeToggle = document.querySelector("#theme-toggle");
const sunIcon = document.querySelector("#sun-icon");
const moonIcon = document.querySelector("#moon-icon");
const themeLabel = document.querySelector("#theme-label");
const clearAll = document.querySelector("#clear-all");
let hours, minutes, am_pm;
let counter = 0;
let editTodoId = null;
cancelEdit.className = "hidden";


themeToggle.addEventListener('click', (e) => {
  counter++;
  document.querySelector("body").classList.toggle("dark-mode");
  if (counter % 2 !== 0) {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    themeLabel.textContent = `Light`;
  } else {
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    themeLabel.textContent = `Dark`;
  }


})


clearAll.addEventListener('click', (e) => {
  todos = [];
  todoList.innerHTML="";
  emptyTodo.classList.remove("hidden");
  emptyTodo.innerHTML = `<div class="empty-icon">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
              </svg>
            </div>

            <p class="display mt-4 text-base font-bold">A little space for big plans</p>
            <p class="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed" style="color:var(--muted)">
              Your list is empty. Add your first task and get the ball rolling.
            </p>`;
  localStorage.setItem("todos", JSON.stringify(todos));
  clearAll.classList.add("hidden");
})





todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoValue = todoInput.value.trim();

  if (!todoValue) {
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("flex");
    return
  }

  errorMsg.classList.remove("flex");
  errorMsg.classList.add("hidden");

  // EDITING

  if (editTodoId !== null) {

    todos = todos.map((todo) => {

      if (todo.id === Number(editTodoId)) {
        return {
          ...todo,
          text: todoValue
        };
      }

      return todo;
    });

    editTodoId = null;
    formBtn.textContent = "Add";
    todoInput.value = "";
    formBtn.className = "px-7 text-white py-4 bg-emerald-500 rounded-md transition-all duration-3s active:translate-y-1 active:shadow-sm font-semibold tracking-wide";
    cancelEdit.className = "hidden";
    renderTodo();
    taskCompletionBar();
  }

  // ADDING
  else {


    let date = new Date();
    if (date.getHours() >= 0 && date.getHours() <= 9)
      hours = "0" + date.getHours();
    else
      hours = date.getHours();


    if (date.getHours() >= 12) {
      if (date.getHours() - 12 > 0 && date.getHours() - 12 <= 9)
        hours = "0" + (date.getHours() - 12);
      else if (date.getHours() - 12 === 0)
        hours = date.getHours();
      else
        hours = date.getHours() - 12;
      am_pm = "PM";
    }

    else {
      if (date.getHours() === 0)
        hours = date.getHours() + 12;
      am_pm = "AM";
    }



    if (date.getMinutes() >= 0 && date.getMinutes() <= 9)
      minutes = "0" + date.getMinutes();
    else
      minutes = date.getMinutes();


    let current_date = date.getDate();
    let months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ];
    let current_month = months[date.getMonth()];
    let days = [
      "Sun", "Mon", "Tue", "Wed",
      "Thu", "Fri", "Sat"
    ];
    let current_day = days[date.getDay()];
    let current_year = date.getFullYear();
    let newTodo = {
      id: Date.now(),
      text: todoValue,
      isCompleted: false,
      hours: hours,
      minutes: minutes,
      current_date: current_date,
      current_month: current_month,
      current_day: current_day,
      current_year: current_year,
      am_pm: am_pm
    };

    todos.push(newTodo);
    if (todos.length !== 0)
      emptyTodo.classList.add("hidden");
    else
      emptyTodo.classList.remove("hidden");

    todoInput.value = "";

    renderTodo();
    taskCompletionBar();
  }
});


function renderTodo() {
  todoList.innerHTML = "";
  if (todos.length != 0)
    emptyTodo.className = "hidden";
  else if (todos.length === 0) {
    emptyTodo.className = "mt-5 text-center text-gray-400 text-sm py-10 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-400 font-semibold";
    emptyTodo.innerHTML = ` <div class="empty-icon">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
              </svg>
            </div>

            <p class="display mt-4 text-base font-bold">A little space for big plans</p>
            <p class="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed" style="color:var(--muted)">
              Your list is empty. Add your first task and get the ball rolling.
            </p>`;
  }
  todos.forEach(function (todo) {
    addTodo(todo);
  });
}


function addTodo(todo) {
  clearAll.classList.remove("hidden");
  const li = document.createElement("li");

  li.dataset.id = todo.id;

  li.className =
    `flex gap-2 border border-slate-300 p-4 rounded-xl hover:translate-y-1 transition-all duration-200`;




  li.innerHTML = `
  <div class="flex items-center gap-3 flex-1">
    <input
      type="checkbox"
      data-id="${todo.id}"
      ${todo.isCompleted === true ? "checked" : ""}
      class="appearance-none w-3 h-3 shrink-0 border-2 border-gray-300 rounded-full checked:bg-indigo-500 checked:border-indigo-500 focus:outline-none transition-all duration-200"
    >

    <div class="flex-1 min-w-0">
      <p class="${todo.isCompleted === true ? "line-through text-slate-600 opacity-60 font-semibold" : ""}">
        ${todo.text}
      </p>

      <span class="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <i class="fa-regular fa-calendar text-indigo-400"></i>
        <span>${todo.current_day}, ${todo.current_date} ${todo.current_month} ${todo.current_year} · ${todo.hours}:${todo.minutes} ${todo.am_pm}</span>
      </span>
    </div>
  </div>

  <div class="flex gap-2">
    <button
      data-action="edit"
      data-id="${todo.id}"
      class="bg-amber-500 opacity-80 px-3 py-1.5 rounded-lg text-white font-semibold transition-all duration-300 active:translate-y-1 active:shadow-sm tracking-wide">
      Edit
    </button>

    <button
      data-action="delete"
      data-id="${todo.id}"
      class="bg-red-500 opacity-80 px-3 py-1.5 rounded-lg text-white font-semibold transition-all duration-300 active:translate-y-1 active:shadow-sm tracking-wide">
      Delete
    </button>
  </div>
`;

  todoList.append(li);
  localStorage.setItem("todos", JSON.stringify(todos));
  taskCount.textContent = `Goals (${todos.length})`
  completeCount.textContent = `Wins : ${todos.filter((todo) => todo.isCompleted).length}`



}


renderTodo();
taskCompletionBar();

todoList.addEventListener("click", (e) => {

  let li = e.target.closest("li");
  let btn = e.target.closest("button");
  let checkbox = e.target.closest('input[type="checkbox"]');

  let action = btn?.dataset.action;
  let id = li?.dataset?.id;




  // EDIT
  if (action === "edit") {

    editTodoId = id;

    console.log("editing...");

    let currentTodo = todos.find(
      todo => todo.id === Number(id)
    );

    let originalTodoValue = todoInput.value;
    todoInput.value = currentTodo.text;

    formBtn.textContent = "Update";
    cancelEdit.className = "text-sm text-gray-500 mt-2 transition-all duration-300 active:translate-y-1 font-medium";
    cancelEdit.classList.remove("hidden");
    formBtn.className = "bg-orange-500 opacity-80 px-3 py-1.5 rounded-lg text-white font-semibold transition-all duration-3s active:translate-y-1 active:shadow-sm tracking-wide";
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //CANCEL EDIT

  cancelEdit.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON")
      CANCEL();
    taskCompletionBar();
  })

  function CANCEL() {
    todoInput.value = originalTodoValue;
    cancelEdit.classList.add("hidden");
    formBtn.textContent = "Add";
    todoInput.value = "";
    formBtn.className = "px-7 text-white py-4 bg-emerald-500 rounded-md transition-all duration-3s active:translate-y-1 active:shadow-sm font-semibold tracking-wide";
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  // DELETE
  if (action === "delete") {

    console.log("deleting...");

    deleteTodo(id);

  }


  // CHECKBOX
  if (checkbox) {

    todos = todos.map((todo) => {

      if (todo.id === Number(id)) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      }

      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo();
    taskCompletionBar();
  }
});


function deleteTodo(id) {

  todos = todos.filter(
    todo => todo.id !== Number(id)
  );

  if (todos.length !== 0)
    emptyTodo.classList.add("hidden");
  else
    emptyTodo.classList.remove("hidden");
  taskCount.textContent = `TASKS (0)`
  completeCount.textContent = `COMPLETED : 0`

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodo();
  taskCompletionBar();
  console.log(todos);
}


function taskCompletionBar() {
  if (todos.length === 0) {
    progressText.textContent = `0.0%`;
    progressBar.style.width = `0%`;
    progressMessage.textContent = `Let's get started! Complete your first task ✨`;
  } else {
    let counter = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted === true) {
        counter++;
      }
    }
    progressText.textContent = `${(counter / (todos.length) * 100).toFixed(1)}%`;
    progressBar.style.width = `${counter / (todos.length) * 100}%`;
    if (todos.length - counter === 0)
      progressMessage.textContent = `All tasks completed ✨`;
    else if (todos.length - counter === 1)
      progressMessage.textContent = `${todos.length - counter} task left`;
    else
      progressMessage.textContent = `${todos.length - counter} tasks pending`;
  }

}