
// "go to gym", "revision web dev", "take class"
let todos = [{
  id: Date.now(),
  text: "go to gym",
  isCompleted: false
},
{
  id: Date.now(),
  text: "revise web dev",
  isCompleted: false
},
{
  id: Date.now(),
  text: "take class",
  isCompleted: false
}]

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");


todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const todoValue = todoInput.value;
  todos.push(todoValue);

  let newTodo = {
    id: Date.now(),
    text: todoValue,
    isCompleted: false
  }

  addTodo(newTodo);
})

function renderTodo() {
  todoList.innerHTML = "";
  todos.forEach(function (todo) {
    addTodo(todo);

  })
}

renderTodo();

function addTodo(todo) {
  const li = document.createElement("li");

  // li.textContent = todo.text;
li.className=`flex gap-2 border border-slate-300 p-4 rounded-xl`
li.innerHTML=`
  <input type="checkbox" data-id="1">
  <p class="flex-1">${todo.text}</p>
  <div class="flex gap-2">
    <button data-id="1">Edit</button>
    <button data-id="1">Delete</button>
  </div>
</li>`




  todoList.append(li);
}