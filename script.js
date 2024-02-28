// CRUD - create, read, update, delete
// Retrieve todos from localStorage
let getData = JSON.parse(localStorage.getItem('todos'));

// Initialize todos array
let todos = getData || [];

// Get reference to the submit button
let btn = document.getElementById("btn");

// Add event listener to the submit button
btn.addEventListener("click", addTodo);

// Function to store todos data in localStorage
function storeData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add a new todo
function addTodo() {
  let title = document.getElementById("title").value;
  let dueDate = document.getElementById("dueDate").value;
  let id = new Date().getTime();
  todos.push({ id: id, title: title, dueDate: dueDate });
  document.getElementById("title").value = "";
  storeData();
  render();
}

// Function to update a todo
let indexValue;
function updateTodo(e) {
  e.preventDefault();
  let id = Number(e.target.id);
  let data = todos.filter((todo, index) => {
    indexValue = index;
    return todo.id === id;
  });
  document.getElementById("title").value = data[0].title;
  document.getElementById("btn");
  document.getElementById("btn").style = "display:none";
  let ubtn = document.createElement("button");
  ubtn.textContent = "saveUpdate";
  ubtn.id = "updateId";
  ubtn.onclick = saveTodo;
  let form = document.getElementById("form");
  form.append(ubtn);
}

// Function to save updated todo
function saveTodo() {
  document.getElementById("updateId").style = "display:none";
  document.getElementById("btn").style = "display:block";
  let title = document.getElementById("title").value;
  let obj = todos[indexValue];
  todos[indexValue] = { ...obj, title: title };
  storeData();
  document.getElementById("title").value = "";
  render();
}

// Function to delete a todo
function deleteTodo(e){
  let id = Number(e.target.id);
  todos = todos.filter((todo)=>todo.id !== id)
  storeData();
  render();
}

// Function to render todos on the page
const render = function () {
  document.getElementById("render").innerHTML = "";
  todos.map((todo) => {
    let div = document.createElement("div");
    div.textContent = todo.title + " " + todo.dueDate;
    let render = document.getElementById("render");
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.id = todo.id;
    updateBtn.style = "margin-left:12px; margin-top:12px";
    updateBtn.onclick = updateTodo;
    div.append(updateBtn);

    let deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete Todo";
    deletebtn.id = todo.id;
    deletebtn.onclick = deleteTodo;

    div.append(deletebtn);

    render.append(div);
  });
};

// Initial rendering of todos
render();
