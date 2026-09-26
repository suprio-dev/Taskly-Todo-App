
// "go to gym", "revision web dev", "take class"
let todos = [{
  id: Date.now() + 1,
  text: "go to gym",
  isCompleted: false
},
{
  id: Date.now() + 2,
  text: "revise web dev",
  isCompleted: false
},
{
  id: Date.now() + 3,
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
  li.dataset.id=todo.id;
  li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`
  li.innerHTML = `
  <input type="checkbox" data-id=${todo.id} ${todo.isCompleted===true ? 'checked' : ""}>
  <p class="flex-1">${todo.text}</p>
  <div class="flex gap-2">
    <button data-action="edit" data-id=${todo.id}>Edit</button>
    <button data-action="delete" data-id=${todo.id}>Delete</button>
  </div>
</li>`




  todoList.append(li);
}

todoList.addEventListener('click', (e) => {
  let li=e.target.closest('li');
  let btn = e.target.closest('button');
  let action = btn?.dataset.action;
  let id = li?.dataset?.id;
  let checkbox=e.target.closest('input[type="checkbox"]');

  if (action === "edit") {
    console.log("editing...");
  }
  if (action === "delete") {
    console.log("deleting...");
    deleteTodo(e, id);
  }
if(checkbox)
{
 todos=todos.map((todo)=>{
   if (todo.id === Number(id)){
      return {
    ...todo,
  isCompleted : !todo.isCompleted
}
}
return todo;

 })
}
})

function deleteTodo(e) {
  e.target.closest('li').remove();
  todos = todos.filter((todo) => {
    if (todo.id !== Number(id))
      return todo
  })

  // renderTodo()
}