const CELL_SIZE = 50;
const STARTING_ALPHA = 0;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const COLOR_R = 235;
const COLOR_G = 251;
const COLOR_B = 29;

let numRows;
let numCols;
let bgGraphics;
let currentRow = -2;
let currentCol = -2;
let allNeighbors = [];
let colorWithAlpha;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("position", "fixed");
  cnv.style("inset", 0);
  cnv.style("z-index", -1);

  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(1);

  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);

  bgGraphics = createGraphics(width, height);
  bgGraphics.noFill();
  bgGraphics.stroke(197, 182, 175, 7);
  bgGraphics.strokeWeight(1);

  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      bgGraphics.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function draw() {
  background(19, 19, 19);
  image(bgGraphics, 0, 0, width, height);

  // Check if the device is not a touch device before executing the trail effect code
  if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
    // Add check for [no-trail] attribute
    if (!mouseIsOverNoTrailElement()) {
      let row = floor(mouseY / CELL_SIZE);
      let col = floor(mouseX / CELL_SIZE);

      if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col;
        allNeighbors.push(...getRandomNeighbors(row, col));
      }

      let x = col * CELL_SIZE;
      let y = row * CELL_SIZE;

      stroke(colorWithAlpha);
      rect(x, y, CELL_SIZE, CELL_SIZE);

      for (let neighbor of allNeighbors) {
        let neighborX = neighbor.col * CELL_SIZE;
        let neighborY = neighbor.row * CELL_SIZE;
        neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
        stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
        rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
      }
      allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);

  bgGraphics = createGraphics(width, height);
  bgGraphics.noFill();
  bgGraphics.stroke(197, 182, 175, 7);
  bgGraphics.strokeWeight(1);

  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      bgGraphics.rect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function getRandomNeighbors(row, col) {
  let neighbors = [];
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;
      let isCurrentCell = dRow === 0 && dCol === 0;
      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;
      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: 150,
        });
      }
    }
  }
  return neighbors;
}

function mouseIsOverNoTrailElement() {
  let noTrailElements = document.querySelectorAll("[no-trail]");
  for (let element of noTrailElements) {
    let rect = element.getBoundingClientRect();
    if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect
      .bottom) {
      return true;
    }
  }
  return false;
}
</script>

<!--PRELOADER SESSION STORAGE-->
<script>
document.addEventListener('DOMContentLoaded', function() {
    var visited = localStorage.getItem('visited');
    if (visited) {
        // Hide the preloader for returning visitors by simulating the preloader button click
        var preloaderButton = document.querySelector('#trigger-button'); // Adjust selector as necessary
        if(preloaderButton) {
            preloaderButton.click(); // Simulate the button click
        }
    } else {
        // Set 'visited' flag for first-time visitors
        localStorage.setItem('visited', 'true');
    }
});
</script>

<!--DISABLE SCROLLING-->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Check if the preloader is supposed to run
    if (sessionStorage.getItem('isPreloading') === 'true') {
        disableScroll();

        // Assuming you have a button with an id 'preloaderExitButton' to trigger the exit animation
        const exitButton = document.getElementById('preloaderExitButton');
        
        if (exitButton) {
            exitButton.addEventListener('click', function() {
                // Wait for the duration of the exit animation before re-enabling scrolling
                setTimeout(enableScroll, 3600); // Adjust the duration as per your animation
                
                // Optionally, update or remove the session storage item if the preloader won't be needed again
                sessionStorage.setItem('isPreloading', 'false'); // or sessionStorage.removeItem('isPreloading');
            });
        }
    }
});

function disableScroll() {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
}

function enableScroll() {
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
}
