/** fetchWeather **/

function getWeatherData(location) {
const apiKey = "6eb1180161eccb06843669dbee0f87b3";
const url = `https://api.openweathermap.org/data/2.5/weather?
q=${location}&units=metric&appid=${apiKey}`;
return fetch(url)
.then(response => response.json())
.then(data => {
const weatherData = {
temperature: data.main.temp,
condition: data.weather[0].main,
location: data.name,
};
return weatherData;
});
}
function updateUI(weatherData) {
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const location = document.querySelector("#location");
temperature.textContent = `${weatherData.temperature}°C`;
condition.textContent = weatherData.condition;
location.textContent = weatherData.location;
}
const searchBtn = document.querySelector(".search-btn");
const reSyncBtn = document.querySelector(".resync-btn");
const searchBar = document.querySelector("#search-bar");
reSyncBtn.addEventListener("click", () => {
const location = "vadodara";
getWeatherData(location)
.then(weatherData => {
updateUI(weatherData);
})
.catch(error => {
console.log(error);

});
searchBar.value = "";
})
searchBtn.addEventListener("click", () => {
if(searchBar.value.length == 0){
alert("Enter any location");
}
const location = searchBar.value;
getWeatherData(location)
.then(weatherData => {
updateUI(weatherData);
})
.catch(error => {
console.log(error);
});
});
/** toDoList */

//Initial References
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
const addButton = document.querySelector("#push");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
const location = "vadodara";
getWeatherData(location)
.then(weatherData => {
updateUI(weatherData);
})
.catch(error => {
console.log(error);
});
updateNote = "";

count = Object.keys(localStorage).length;
displayTasks();
};
//Function to Display The Tasks
const displayTasks = () => {
if (Object.keys(localStorage).length > 0) {
tasksDiv.style.display = "inline-block";
} else {
tasksDiv.style.display = "none";
}
//Clear the tasks
tasksDiv.innerHTML = "";
newTaskInput.focus();
//Fetch All The Keys in local storage
let tasks = Object.keys(localStorage);
//console.log(tasks);
tasks = tasks.sort();
for (let key of tasks) {
let classValue = "";
//Get all values
let value = localStorage.getItem(key);
let taskInnerDiv = document.createElement("div");
taskInnerDiv.classList.add("task");
taskInnerDiv.setAttribute("id", key);
taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}
</span>`;
//localstorage would store boolean as string so we parse it to boolean back
let editButton = document.createElement("button");
editButton.classList.add("edit");
editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
if (!JSON.parse(value)) {
editButton.style.visibility = "visible";
} else {
editButton.style.visibility = "hidden";
taskInnerDiv.classList.add("completed");

}
taskInnerDiv.appendChild(editButton);

taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-
trash"></i></button>`;

tasksDiv.appendChild(taskInnerDiv);
}
// tasks = document.querySelectorAll(".task");
// tasks.forEach((element, index) => {
// element.onclick = () => {
// //local storage update
// if (element.classList.contains("completed")) {
// updateStorage(element.id.split("_")[0], element.innerText, false);
// } else {
// updateStorage(element.id.split("_")[0], element.innerText, true);
// }
// };
// });

//Edit Tasks
editTasks = document.getElementsByClassName("edit");
Array.from(editTasks).forEach((element, index) => {
element.addEventListener("click", (e) => {
//Stop propogation to outer elements (if removed when we click delete eventually rhw click will move to parent)
// let check = element.classList.contains("completed");
// console.log(check);
e.stopPropagation();
disableButtons(false);
addButton.value = document.getElementById("push").innerHTML = `<i
class="fa fa-check" aria-hidden="true"></i>`;
//update input value and remove div
let parent = element.parentElement;
newTaskInput.value = parent.querySelector("#taskname").innerText;
document.querySelector("#new-task input").focus();
// create cancel and save button on edit click

// let saveButton = document.createElement("button");
// saveButton.classList.add("save");
// saveButton.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
// document.querySelector("#new-task").appendChild(saveButton);
let cancelButton = document.createElement("button");
cancelButton.classList.add("cancel");

cancelButton.innerHTML = `<i class="fa fa-window-close" aria-
hidden="true"></i>`;

document.querySelector("#new-task").appendChild(cancelButton);
// document.getElementById("push").style.display ="none";
//click on cancel button
if(cancelButton.addEventListener("click",(e)=>{
console.log("cancel clicked");
cancelButton.remove();
displayTasks();
newTaskInput.value ="";
addButton.value = document.getElementById("push").innerHTML = `<i
class="fa fa-plus" aria-hidden="true"></i>`;
}));
if(saveButton.addEventListener("click",()=>{
console.log("done after edit clicked");
parent.firstChild.classList.add("done");
// console.log(updateNote);
//updateNote = parent.id;
// cancelButton.remove();
localStorage.removeItem(parent);
console.log(parent);
}));
//set updateNote to the task that is being edited
//console.log(updateNote);
//remove task
parent.remove();
});
});
//Delete Tasks

deleteTasks = document.getElementsByClassName("delete");
Array.from(deleteTasks).forEach((element, index) => {
element.addEventListener("click", (e) => {
e.stopPropagation();
//Delete from local storage and remove div
let parent = element.parentElement;
removeTask(parent.id);
parent.remove();
count -= 1;
});
});
};
//Disable Edit Button
const disableButtons = (bool) => {
let editButtons = document.getElementsByClassName("edit");
Array.from(editButtons).forEach((element) => {
element.disabled = bool;
});
};
//Remove Task from local storage
const removeTask = (taskValue) => {
localStorage.removeItem(taskValue);
displayTasks();
};
//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
localStorage.setItem(`${index}_${taskValue}`, completed);
displayTasks();
};
//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => {
//Enable the edit button
addButton.value = document.getElementById("push").innerHTML = `<i
class="fa fa-plus" aria-hidden="true"></i>`;

if (newTaskInput.value.length == 0) {
alert("Please Enter A Task");
} else {
//Store locally and display from local storage
if (updateNote == "") {
//new task
updateStorage(count, newTaskInput.value, false);
count += 1;
}
//else {
// //update task
// let existingCount = updateNote.split("_")[0];
// removeTask(updateNote);
// updateStorage(existingCount, newTaskInput.value, false);
// updateNote = "";
// }
newTaskInput.value = "";
}
});