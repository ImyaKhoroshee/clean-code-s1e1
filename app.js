const taskInput = document.querySelector("#new-task")
const addButton = document.querySelector(".add-item__button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completedTasks");

// New task list items
const createNewTaskElement = function(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input"); 
  const label = document.createElement("label"); 
  const editInput = document.createElement("input"); 
  const editButton = document.createElement("button"); 
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.classList.add("list-item");

  label.innerText = taskString;
  label.className = "task";
  label.classList.add("task-label");

  checkBox.type = "checkbox";
  checkBox.classList.add("task-checkbox");

  editInput.type = "text";
  editInput.className = "task";
  editInput.classList.add("task-input");

  editButton.innerText = "Edit";
  editButton.className = "edit";
  editButton.classList.add("button");

  deleteButton.className = "delete";
  deleteButton.classList.add("button");

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("delete-cross");

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add new task
const addTask = function() {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit task
const editTask = function() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task-input");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit-mode");
  
  if(containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
};

// Delete task
const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

// Mark task completed
const taskCompleted = function() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark task incompleted
const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

// Add button click handler
addButton.addEventListener("click", addTask);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".task-checkbox");
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  // Edit button click handler
  editButton.addEventListener("click", editTask);
  
  // Delete button click handler
  deleteButton.addEventListener("click", deleteTask);
  
  // Checkbox change handler
  checkBox.onchange = checkBoxEventHandler;
}

// Cycle over items inside incompleteTaskHolder
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over items inside completedTasksHolder
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// TODO: prevent creation of empty tasks.