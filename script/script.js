// Live Date and Time

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();

document.querySelector(".date").innerHTML = `${date}/${month}/${year}`;

function refreshTime() {
  var dateString = new Date()
    .toLocaleString("en-US", { hour12: false })
    .replace(" ", "");
  dateString = dateString.substring(0, dateString.length - 3).split(",");
  var formattedString = dateString[1];
  document.querySelector(".time").innerHTML = formattedString;
}

setInterval(refreshTime, 1000);

let tasksList = [];
let cardNumber = 0;
let count = 0;

const saveToLocalStorage = () => {
  localStorage.setItem("localTasksList", JSON.stringify(tasksList));
  localStorage.setItem("count", JSON.stringify(count));
  localStorage.setItem("cardNumber", JSON.stringify(cardNumber));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const loadFromLocalStorage = () => {
  cardNumber = Number(JSON.parse(localStorage.getItem("cardNumber")));
  if (localStorage.length > 0 && cardNumber > 0) {
    tasksList = JSON.parse(localStorage.getItem("localTasksList"));
    count = Number(JSON.parse(localStorage.getItem("count")));
    generateTaskCard();
  }
};

//Add New Task Button
let addButton = document.querySelector(".add-btn");

//Submit New Task Button
let submitNewTaskButton = document.querySelector(".submit-btn");

//Cancel New Task Button
let cancelNewTaskButton = document.getElementById("cancel-new-btn");
let closeNewTaskButton = document.getElementById("close-btn");

//Form (new task)
let newTaskForm = document.querySelector(".add-task-form");

//Task Title Input
let newTaskTitleInput = document.querySelector(".task-input-title");

//Task Details Input
let newTaskDetailsInput = document.querySelector(".task-input-details");

let cancelEditButton = document.getElementById("cancel-edit-btn");

const generateTaskCard = () => {
  document.querySelector(".no-task").style.display = "none";
  let cardListElement = document.querySelector(".tasks-list");
  let cardContent = `<div class="tasks">`;
  tasksList.map((task) => {
    let taskCardId = task.id;
    let taskCardTitle = task.title;
    let taskCardDetails = task.details;
    let taskDone = task.done;
    cardContent =
      cardContent +
      `
    <div class="task-card" id="task-card-${taskCardId}">
              <img
                src=${
                  taskDone
                    ? "./images/tick-checkbox.svg"
                    : "./images/checkbox.svg"
                }
                alt="check box"
                id="check-box-${taskCardId}"
                class="check-box"
                onclick="handleCheckBox(event,${taskCardId})"
              />
              <div class="card-content" id="card-content-${taskCardId}" >
              <div class="modal-area" onclick="openCardModal(event, ${taskCardId})">
                <h5 class="card-title">${taskCardTitle}</h5>
                <p class="card-details">${taskCardDetails}</p>
                </div>
                <div class="card-buttons">
                  <button class="btn delete-btn" onclick="deleteCard(event , ${taskCardId})">
                    <svg
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="_x32_"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xml:space="preserve"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <style type="text/css">
                          .st0 {
                            fill: #000000;
                          }
                        </style>
                        <g>
                          <path
                            class="st0"
                            d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297 C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297 c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695 h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z"
                          ></path>
                          <path
                            class="st0"
                            d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269 l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296 c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288 c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241 c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125 c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <button class="btn edit-btn" onclick="editCard(event, ${taskCardId})">
                    <svg
                      viewBox="0 -0.5 21 21"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <title>edit_cover [#1481]</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-419.000000, -359.000000)"
                            fill="#000000"
                          >
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <path
                                d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z"
                                id="edit_cover-[#1481]"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
    
    `;
  });
  cardContent = cardContent + `</div>`;
  cardListElement.innerHTML = cardContent;
};

const emptyForm = () => {
  newTaskTitleInput.value = "";
  newTaskDetailsInput.value = "";
};

const getNewTaskInput = (event) => {
  event.preventDefault();
  let newTaskTitle = newTaskTitleInput.value;
  let newTaskDetails = newTaskDetailsInput.value;
  cardNumber++;
  count++;
  let task = {
    id: count,
    title: newTaskTitle,
    details: newTaskDetails,
    done: false,
  };
  tasksList.push(task);
  clearLocalStorage();
  saveToLocalStorage();
  document.querySelector(".task-input").style.display = "none";
  generateTaskCard();
  emptyForm();
};

const editCard = (event, taskCardId) => {
  event.preventDefault();
  let previousCardTitle = tasksList[taskCardId - 1].title;
  let previousCardDetails = tasksList[taskCardId - 1].details;
  let previousCardDone = tasksList[taskCardId - 1].done;
  document.querySelector(".edit-task-input").style.display = "block";
  document.querySelector(
    ".edit-task-input"
  ).innerHTML = `<h2>Edit your task</h2>
            <form class="edit-task-form">
              <input
                id="edit-input-${taskCardId}"
                type="text"
                class="edit-task-input-title"
                placeholder="Task Title"
                autocomplete="off"
                value="${previousCardTitle}"
              />
              <textarea
                id="edit-textarea-${taskCardId}"
                type="text"
                class="edit-task-input-details"
                placeholder="Task Details..."
                rows="10"
                autocomplete="off"
                            >${previousCardDetails}</textarea>
              <div class="buttons">
                <button type="button" class="btn save-edit-btn" onclick="saveEdit(event, ${taskCardId}, ${previousCardDone})">Save</button>
                <button type="button" class="btn cancel-btn"  onclick="closeEditWindow(event)">
                  Cancel
                </button>
              </div>
            </form>`;
};

const deleteCard = (event, taskCardId) => {
  event.preventDefault();
  const cardToDelete = tasksList.findIndex((task) => task.id === taskCardId);
  tasksList.splice(cardToDelete, 1);
  generateTaskCard();
  cardNumber--;
  clearLocalStorage();
  saveToLocalStorage();
  if (tasksList.length === 0) {
    clearLocalStorage();
    document.querySelector(".no-task").style.display = "flex";
  }
};

const saveEdit = (event, taskCardId, previousCardDone) => {
  let editedTaskCardTitle = document.getElementById(
    `edit-input-${taskCardId}`
  ).value;
  let editedTaskCardDetails = document.getElementById(
    `edit-textarea-${taskCardId}`
  ).value;
  document.getElementById(`card-content-${taskCardId}`).innerHTML = `
                <div class="modal-area" onclick="openCardModal(event, ${taskCardId})">
  <h5 class="card title">${editedTaskCardTitle}</h5>
<p class="card-details">${editedTaskCardDetails}</p>
</div>
 <div class="card-buttons">
                  <button class="btn delete-btn" onclick="deleteCard(event , ${taskCardId})">
                    <svg
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="_x32_"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xml:space="preserve"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <style type="text/css">
                          .st0 {
                            fill: #000000;
                          }
                        </style>
                        <g>
                          <path
                            class="st0"
                            d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297 C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297 c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695 h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z"
                          ></path>
                          <path
                            class="st0"
                            d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269 l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296 c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288 c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241 c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125 c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <button class="btn edit-btn" onclick="editCard(event, ${taskCardId})">
                    <svg
                      viewBox="0 -0.5 21 21"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <title>edit_cover [#1481]</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-419.000000, -359.000000)"
                            fill="#000000"
                          >
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <path
                                d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z"
                                id="edit_cover-[#1481]"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>`;

  let editedTask = {
    id: taskCardId,
    title: editedTaskCardTitle,
    details: editedTaskCardDetails,
    done: previousCardDone,
  };

  const cardToDelete = tasksList.findIndex((task) => task.id === taskCardId);
  tasksList.splice(cardToDelete, 1, editedTask);
  localStorage.removeItem("tasksList");
  localStorage.setItem("localTasksList", JSON.stringify(tasksList));
  closeEditWindow(event);
};
const closeEditWindow = (event) => {
  event.preventDefault(),
    (document.querySelector(".edit-task-input").style.display = "none");
};

const handleCheckBox = (event, taskCardId) => {
  event.preventDefault();
  let checkbox = document.getElementById(`check-box-${taskCardId}`);
  if (!tasksList[taskCardId - 1].done) {
    checkbox.src = "./images/tick-checkbox.svg";
    tasksList[taskCardId - 1].done = true;
  } else if (tasksList[taskCardId - 1].done) {
    checkbox.src = "./images/checkbox.svg";
    tasksList[taskCardId - 1].done = false;
  }
  clearLocalStorage();
  saveToLocalStorage();
};

const openCardModal = (event, taskCardId) => {
  event.preventDefault();
  let modalTitle = tasksList[taskCardId - 1].title;
  let modalDetails = tasksList[taskCardId - 1].details;
  let modalElement = document.querySelector(".card-modal");
  modalElement.style.display = "block";
  modalElement.innerHTML = `
  <h2>${modalTitle}</h2>
  <p>${modalDetails}</p>
  <button class="btn close-btn close-modal-btn" id="close-modal-btn" onclick="closeCardModal(event)">
            <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
              <g id="SVGRepo_iconCarrier">
                <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
                  stroke-linejoin="round">
                  <g transform="translate(-157.000000, -158.000000)" id="Group" stroke="#000000" stroke-width="2">
                    <g transform="translate(153.000000, 154.000000)" id="Shape">
                      <path d="M19,5 L5,19 M19,19 L5,5"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>`;
};

const closeCardModal = (event) => {
  event.preventDefault();
  let modalElement = document.querySelector(".card-modal");
  modalElement.style.display = "none";
};
addButton.addEventListener("click", () => {
  document.querySelector(".task-input").style.display = "block";
});
cancelNewTaskButton.addEventListener("click", () => {
  document.querySelector(".task-input").style.display = "none";
});
closeNewTaskButton.addEventListener("click", () => {
  document.querySelector(".task-input").style.display = "none";
});

newTaskForm.addEventListener("submit", getNewTaskInput);
