const nameInput = document.querySelector("#name");
const newTodoForm = document.querySelector("#new-todo-form");
const list = document.querySelector(".list");
const todoItem = document.querySelector("#todo-list");

let todos = JSON.parse(localStorage.getItem("todosl")) || [];
let editName;

//   Setting Usename to Local storage
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("username", e.target.value);
});

//Get usename from local storage
const username = localStorage.getItem("username") || "";

//   Display username
nameInput.value = username;

//   Set todo to Local storage
function toLocalStorage() {
  localStorage.setItem("todosl", JSON.stringify(todos));
}

// Displat todo
function displayTodo() {
  let markup = "";

  todos.forEach((todo, id) => {
    let isCompleted = todo.done === true ? "checked" : "";
    editName = todo;

    markup += `<div class="todo-item">
      <label>
        <input type="checkbox" onClick="updateStatus(this)" id="${id}" ${isCompleted} />
        <span class="bubble ${todo.category}"></span>
      </label>

     <div class="todo-content">
       <input type="text" class="${isCompleted} input"  value="${todo.content}" readonly />
     </div>

     <div class="action">
       <button value='edit' class="edit">Edit</button>
       <button id="${id}" class="delete">Delete</button>
     </div>
   </div>`;
  });
  todoItem.innerHTML = markup;
}

displayTodo();

newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = {
    content: e.target.elements.content.value,
    category: e.target.category.value,
    done: false,
  };

  if (todo.content === "") return;
  todos.push(todo);

  e.target.reset();
  toLocalStorage();
  displayTodo();
});

// Delete Handler
todoItem.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete")) {
    console.log(target, target.id);
    todos.splice(target.id, 1);
    displayTodo();
    toLocalStorage();
  }
});

// Edit Handler
todoItem.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("edit")) {
    let taskName =
      target.parentElement.previousElementSibling.firstElementChild;

    if (target.value === "edit") {
      console.log(target.value);
      taskName.removeAttribute("readonly");
      target.value = "Save";
      target.textContent = "Save";
      input = document.querySelector(".input");
      input.focus();
    } else {
      taskName.setAttribute("readonly", "readonly");
      target.value = "edit";
      target.textContent = "Edit";
      if (taskName.value === "") return;
      editName.content = taskName.value;
      toLocalStorage();
    }
  }
});

// Checked Handler
function updateStatus(selected) {
  let taskName = selected.parentElement.nextElementSibling.lastElementChild;
  if (selected.checked) {
    taskName.classList.add("checked");
    todos[selected.id].done = true;
  } else {
    taskName.classList.remove("checked");
    todos[selected.id].done = false;
  }
  toLocalStorage();
}
