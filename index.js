const field = document.querySelector(".field");
const template = document.querySelector("#cube").content;

const cubes = [{ id: 1, dims: 6 }];

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

function createCube(cube) {
  const cubeDiv = template.querySelector(".cube").cloneNode(true);
  cubeDiv.id = `cube_id_${cube.id}`;
  cubeDiv.dims = cube.dims;
  cubeDiv.classList.add("cube");
  return cubeDiv;
}

function insertCube(cube) {
  const cubeDiv = createCube(cube);
  field.append(cubeDiv);
}

cubes.forEach((element) => {
  insertCube(element);
});

field.addEventListener(
  "click",
  (e) => {
    if (field !== e.target) return;
    rotate();
  },
  false
);
