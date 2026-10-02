let todos = [];

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const formBtn = document.querySelector("#form-btn");
const taskCount = document.querySelector("#task-count");
const completeCount = document.querySelector("#complete-count");
const emptyTodo = document.querySelector("#empty-todo");
const cancelEdit = document.querySelector("#cancel-edit");


let editTodoId = null;
cancelEdit.className = "hidden";

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoValue = todoInput.value.trim();

  if (!todoValue) {
    return
  }


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
    formBtn.className = "px-7 text-white py-4 bg-indigo-600 rounded-md transition-all duration-3s active:translate-y-1 active:shadow-sm font-semibold tracking-wide";
    cancelEdit.className = "hidden";
    renderTodo();
  }

  // ADDING
  else {

    let newTodo = {
      id: Date.now(),
      text: todoValue,
      isCompleted: false
    };

    todos.push(newTodo);
    if (todos.length !== 0)
      emptyTodo.classList.add("hidden");
    else
      emptyTodo.classList.remove("hidden");

    todoInput.value = "";

    renderTodo();
  }
});


function renderTodo() {
  todoList.innerHTML = "";

  todos.forEach(function (todo) {
    addTodo(todo);
  });
}


function addTodo(todo) {

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

  <p class="flex-1 ${todo.isCompleted === true ? "line-through text-slate-600 opacity-60" : ""}">
    ${todo.text}
  </p>
</div>

    <div class="flex gap-2">
      <button data-action="edit" data-id="${todo.id}" class="bg-amber-500 opacity-80 px-3 py-1.5 rounded-lg text-white font-semibold transition-all duration-3s active:translate-y-1 active:shadow-sm tracking-wide">
        Edit
      </button>

      <button data-action="delete" data-id="${todo.id}" class="bg-red-500 opacity-80 px-3 py-1.5 rounded-lg text-white
       font-semibold transition-all duration-3s active:translate-y-1 active:shadow-sm tracking-wide">
        Delete
      </button>
    </div>`;

  todoList.append(li);

  taskCount.textContent = `TASKS (${todos.length})`
  completeCount.textContent = `COMPLETED : ${todos.filter((todo) => todo.isCompleted).length}`



}


renderTodo();


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
    
  }

//CANCEL EDIT

cancelEdit.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON")
        CANCEL();
    })

function CANCEL(){
  todoInput.value = originalTodoValue;
      cancelEdit.classList.add("hidden");
      formBtn.textContent = "Add";
      todoInput.value = "";
      formBtn.className = "px-7 text-white py-4 bg-indigo-600 rounded-md transition-all duration-3s active:translate-y-1 active:shadow-sm font-semibold tracking-wide";

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
    renderTodo()
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


  renderTodo();
}