// CRUD - create, read, update, delete

//1. Retrieve todos from localStorage
//This line retrieves the todos data stored in the browser's localStorage under the key 'todos'. 
//It parses the JSON data into a JavaScript object and assigns it to the variable getData.
let getData = JSON.parse(localStorage.getItem('todos'));

//2. Initialize todos array
//This line initializes an array called todos. 
//If there is data retrieved from localStorage (getData is not null), 
//it assigns that data to todos. Otherwise, it initializes an empty array.
let todos = getData || [];

//3. Get reference to the submit button
//It gets a reference to the HTML element with the id "btn" and assigns it to the variable btn.
let btn = document.getElementById("btn");

//4. Add event listener to the submit button
//It adds a click event listener to the submit button (btn).
//When the button is clicked, it will execute the addTodo function.
btn.addEventListener("click", addTodo);

//5. Function to store todos data in localStorage
//This function saves the todos array to localStorage. 
//It converts the todos array to a JSON string and stores it under the key 'todos'.
function storeData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//6. Function to add a new todo
//This function gets the values of the title and dueDate input fields, 
//generates a unique id using the current timestamp, 
//pushes a new todo object into the todos array, 
//clears the title input field, 
//stores the updated todos array in localStorage, 
//and finally, calls the render function to update the UI.
function addTodo() {
  let title = document.getElementById("title").value;
  let dueDate = document.getElementById("dueDate").value;
  let id = new Date().getTime();
  todos.push({ id: id, title: title, dueDate: dueDate });
  document.getElementById("title").value = "";
  storeData();
  render();
}

//7. Function to update a todo
//This function is triggered when the "Update" button is clicked. 
//It identifies the todo to be updated based on its id, 
//sets the value of the title input field to the todo's title, 
//hides the submit button, creates a new "Save Update" button dynamically, 
//appends it to the form, and assigns an event listener to it (saveTodo function).
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

//8. Function to save updated todo
//This function is triggered when the "Save Update" button is clicked. 
//It updates the title of the todo in the todos array, 
//saves the updated todos array in localStorage, clears the title input field, 
//and calls the render function to update the UI.
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

//9. Function to delete a todo
//This function is triggered when the "Delete Todo" button is clicked. 
//It filters out the todo with the clicked id from the todos array, 
//updates the todos array in localStorage, and calls the render function to update the UI.
function deleteTodo(e){
  let id = Number(e.target.id);
  todos = todos.filter((todo)=>todo.id !== id)
  storeData();
  render();
}

//10. Function to render todos on the page
//This function renders the todos on the page. 
//It clears the content of the element with the id "render", 
//iterates over the todos array, creates HTML elements for each todo 
//(a div containing the todo title, an "Update" button, and a "Delete Todo" button), 
//assigns event listeners to the buttons, and appends them to the "render" element.
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

//11. Initial rendering of todos
//t calls the render function to initially render the todos on the page when the script is first loaded.
render();
