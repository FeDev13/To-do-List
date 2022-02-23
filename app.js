// Element selection
const clearbutton = document.querySelector(".clearbutton");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const imput = document.getElementById("imput");

// Classes
const CHECK = "fa-check circle";
const UNCHECK = "fa-circle thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [];
id = 0;

//Show date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
//ToDo function

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
    <i
      class="fa ${DONE} co fa-1.5x"
      job="complete"
      id="0"
    ></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o fa-1.5x" job="delete" id="0"></i>
  </li>
  `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//when enter gets hit add item

document.addEventListener("keyup", keypress);
function keypress(e) {
  e.preventDefault();
  if (e.key === "Enter" || e.keyCode === 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
}

// Function to do completed
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Function remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}
localStorage.setItem("TODO", JSON.stringify(LIST));

//Target items
list.addEventListener("click", function (event) {
  let element = event.target; //returns element when clicked
  const elementJob = event.target.attributes.job.value; //complete || delete
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
});

//Clear button
clearbutton.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//Local stge
let data = localStorage.getItem("TODO");

//Data check for empty
if (data) {
  LIST = JSON.parse(data);
  loadTODO(LIST);
  id = LIST.lenght;
} else {
  LIST = [];
  id = 0;
}

//Item load
function loadTODO(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}
