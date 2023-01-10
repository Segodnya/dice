const field = document.querySelector(".field");
const template = document.querySelector("#cube").content;
const btnAdd = document.querySelector(".button__add");
const btnDel = document.querySelector(".button__del");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup__text");
const popupBtn = document.querySelector(".popup__button");
const cubeTypeNode = document.querySelector(".div-cube-type");
let CURRENT_CUBE = null;

let CURRENT_ID = 0;

function changeDims(btn, currentId) {
  document.querySelector(`#${currentId}`).dims = Number(btn.value);
  switch (Number(btn.value)) {
    case 4:
      document.querySelector(`#${currentId}`).style.borderColor = "red";
      break;
    case 6:
      document.querySelector(`#${currentId}`).style.borderColor = "blue";
      break;
    case 10:
      document.querySelector(`#${currentId}`).style.borderColor = "green";
      break;
    case 14:
      document.querySelector(`#${currentId}`).style.borderColor = "orange";
      break;
    case 20:
      document.querySelector(`#${currentId}`).style.borderColor = "purple";
      break;
  }
  cubeTypeNode.classList.remove("div-cube-type_opened");
}

function setupMenu(e) {
  let cube = e.target;
  CURRENT_CUBE = cube;
  document.querySelector(`.button__d${cube.dims}`).checked = true;
  cubeTypeNode.classList.add("div-cube-type_opened");
}

const btns = cubeTypeNode.querySelectorAll(".button");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeDims(btn, CURRENT_CUBE.id);
  });
});

function rollCube(dims) {
  return Math.ceil(Math.random() * dims);
}

function rotate() {
  const cubeDivs = document.querySelectorAll(".cube");
  let timeout = 0;
  cubeDivs.forEach(
    (element) => {
      element.textContent = "";
      element.classList.add("rotation");
      timeout = setTimeout(function () {
        element.classList.remove("rotation");
        element.textContent = rollCube(element.dims);
        timeout = 0;
      }, 1000);
    },
    function () {
      element.classList.remove("rotation");
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
    }
  );
}

function updArray() {
  cubes.push({ id: CURRENT_ID, dims: 6 });
}

function getLastCube() {
  return cubes.slice(-1)[0];
}

function createCube() {
  const cubeDiv = template.querySelector(".cube").cloneNode(true);
  cubeDiv.id = `cube_id_${CURRENT_ID}`;
  cubeDiv.dims = 6;
  cubeDiv.style.borderColor = "blue";
  cubeDiv.classList.add("cube");
  cubeDiv.addEventListener("click", (e) => {
    setupMenu(e);
  });
  CURRENT_ID += 1;
  return cubeDiv;
}

function insertCube() {
  const cubeDiv = createCube(cube);
  field.append(cubeDiv);
}

function openPopup(text) {
  popup.classList.add("popup_opened");
  popupText.textContent = text;
}
function closePopup() {
  popup.classList.remove("popup_opened");
}

insertCube();

btnAdd.addEventListener("click", () => {
  const cubesCurrent = document.querySelectorAll(".cube");
  if (cubesCurrent.length < 6) {
    insertCube();
  } else {
    openPopup("Нельзя играть больше, чем с шестью кубиками!");
  }
});

btnDel.addEventListener("click", () => {
  const cubesCurrent = document.querySelectorAll(".cube");
  if (cubesCurrent.length > 1) {
    cubesCurrent[cubesCurrent.length - 1].remove();
  } else {
    openPopup("Должен остаться хотя бы один кубик!");
  }
});

field.addEventListener(
  "click",
  (e) => {
    if (field !== e.target) return;
    rotate();
  },
  false
);

popupBtn.addEventListener("click", closePopup);
