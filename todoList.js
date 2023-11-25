const inputItem = document.querySelector(".input-item");
const list = document.querySelector(".list");
let action = 0;
let TaskIdToUpdate;

function addTasks() {
  console.log("here");
  if (action == 1) {
    if (inputItem !== null) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const currantTasks = tasks.filter((item) => item.id != TaskIdToUpdate);
      const updatedTask = {
        id: TaskIdToUpdate,
        text: inputItem.value,
      };
      currantTasks.unshift(updatedTask);
      localStorage.setItem("tasks", JSON.stringify(currantTasks));
      inputItem.value = "";
      action = 0;
      showTaskFromLocalStorage();
      // console.log(currantTasks);
    }
    // console.log(TaskIdToUpdate);
    return 0;
  }
  if (inputItem.value === "") {
    alert("Write something");
  } else {
    console.log("Add");
    const newTask = {
      id: Date.now(),
      text: inputItem.value,
    };
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTaskFromLocalStorage();
    // let taskId = Date.now(); // Unique identifier for each task
    // let listItem = document.createElement("li");
    // listItem.setAttribute("data-task-id", taskId);
    // listItem.innerHTML = `${inputItem.value}<i data-task-id="${taskId}"></i>
    // <button class='edit-btn'>Edit</button>`;
    // list.appendChild(listItem);
  }
  inputItem.value = "";
  // saveTaskInLocalStorage();
}

list.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("done");
      saveTaskInLocalStorage();
    }
  },
  false
);

inputItem.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTasks();
  }
});

function editTask(Id) {
  action = 1;
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.filter((item) => item.id == Id);
  TaskIdToUpdate = task[0].id;
  if (task) inputItem.value = task[0].text;

  // const newContent = prompt("Edit task:", taskContent);
}

function removeFromLocalStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  showTaskFromLocalStorage();
}

function showTaskFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let output = "";
  tasks.forEach((item) => {
    output += `<li>${item.text} <i data-task-id="${item.id}" onclick='removeFromLocalStorage(${item.id})'></i>
    <button title='Edit Task' class='edit-btn' onclick='editTask(${item.id})'>Edit</button>
    </li>`;
  });
  list.innerHTML = output;
}

showTaskFromLocalStorage();
