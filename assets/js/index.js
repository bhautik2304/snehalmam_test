// show all task func
function showAllTask() {
    const task = JSON.parse(localStorage.getItem("task")) || []
    if (task.length > 0) {
        const pandingTask=task.filter(task=>task.status==false) || []
    if (pandingTask.length > 0) {
                $(".tasks_div").show()
        var taskHtml = ""
        for (let i = 0; i < pandingTask.length; i++) {
            // console.log(task[i]);
            var taskHtmls = `
            <div class="task id=${pandingTask[i].id}>
            <span id="taskname">
            ${pandingTask[i].task}
            </span>
            <button class="edit" onclick='updateTask(${JSON.stringify(pandingTask[i])},${i})'>
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="deleteTask('${pandingTask[i].id}')" class="delete">
            <i class="fa-solid fa-trash"></i>
            </button>
            <button onclick="completetask('${pandingTask[i].id}',${i})" class="complet">
            <i class="fa-solid fa-check"></i>
            </button>
            </div>
            `;
            
            var taskHt = taskHtml += taskHtmls
        }
        $("#tasks").html(taskHt)
    }else{
        $("#tasks").html(`<center>Create New Task</center>`)    
    }

    const completdTask=task.filter(task=>task.status==true) || []
    if (completdTask.length > 0) {
                $(".Complet_tasks_div").show()
        // $("#Complet_tasks").show()
        var taskComHtml = ""
        for (let i = 0; i < completdTask.length; i++) {
            // console.log(task[i]);
            var taskComHtmls = `
            <div class="task id=${completdTask[i].id}>
            <span id="taskname">
            ${completdTask[i].task}
            </span>
            <button onclick="deleteTask('${completdTask[i].id}')" class="uncdelete">
            <i class="fa-solid fa-trash"></i>
            </button>
            <button onclick="uncompletetask('${completdTask[i].id}',${i})" class="unc">
            <i class="fa-solid fa-times text-danger"></i>
            </button>
            </div>
            `;
            var taskComHt = taskComHtml += taskComHtmls
        }
        $("#Complet_tasks").html(taskComHt)

    }else{
        $("#Complet_tasks").html(`<center>Complete Old Task</center>`)    
    }
    }else{
        $(".tasks_div").hide()
        $(".Complet_tasks_div").hide()
    }
    
}
window.onload = () => {
    const location = "vadodara";
    getWeatherData(location)
        .then(weatherData => {
            updateUI(weatherData);
            showAllTask()
        })
        .catch(error => {
            console.log(error);
            showAllTask()
        });
}
function createTask() {
    const vars = $("#task_input").val()
    if (vars == "") {
       alert("Pls Enter Value")
       return 0
        }
    const task = {
        id: uuidv4(),
        task: vars,
        status: false,
    }
    const alltask = JSON.parse(localStorage.getItem("task")) || []
    alltask.push(task)
    localStorage.setItem("task", JSON.stringify(alltask))
    showAllTask()
    $("#task_input").val("")
}
function updateTask(task, key) {

    if (!($("#task_input").val() == "")) {
        const inputvaL = $("#task_input").val()
        console.log("Yes I m Run");
        const task = {
            id: uuidv4(),
            task: inputvaL,
            status: false,
        }
        const alltask = JSON.parse(localStorage.getItem("task")) || []
        alltask.push(task)
        localStorage.setItem("task", JSON.stringify(alltask))
    }
    const inputvaL = $("#task_input").val(task.task)
    const alltask = JSON.parse(localStorage.getItem("task")) || [];
    alltask.splice(alltask.findIndex(a => a.id === task.id), 1);
    console.log(alltask.length);
    localStorage.setItem("task", JSON.stringify(alltask))
    showAllTask()
}
function deleteTask(id) {
    const alltask = JSON.parse(localStorage.getItem("task")) || [];
    alltask.splice(alltask.findIndex(a => a.id === id), 1);
    console.log(alltask);
    localStorage.setItem("task", JSON.stringify(alltask))
    showAllTask()
}
function completetask(id) {
    const alltask = JSON.parse(localStorage.getItem("task")) || [];
    alltask[alltask.findIndex(a => a.id === id)].status=true
    console.log(alltask);
    localStorage.setItem("task", JSON.stringify(alltask))
    showAllTask()
}
function uncompletetask(id) {
    const alltask = JSON.parse(localStorage.getItem("task")) || [];
    alltask[alltask.findIndex(a => a.id === id)].status=false
    console.log(alltask);
    localStorage.setItem("task", JSON.stringify(alltask))
    showAllTask()
}

function uuidv4() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
    if (searchBar.value.length == 0) {
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
// window.onload = () => {
    

// };

