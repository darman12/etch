init(16);

function init(gridSize) {
    createGrid(gridSize);
    createListeners();

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener('click', reset);
    
    const resizeButton = document.getElementById("resize-button");
    resizeButton.addEventListener('click', resizeGrid);
}

function createGrid(gridSize) {
    let gridArea = document.getElementById("grid-area");

    gridArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const cell = document.createElement("div");
        cell.style.transition = `${Math.random() * 2}s`;
        cell.classList.add("grid-cell");
        gridArea.appendChild(cell);
    }
}

function createListeners() {
    let cells = getCells();
    
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            cell.classList.add("invisible");
        });
    });
}

function reset() {
    let cells = getCells();
    cells.forEach((cell) => {
        cell.style.transition = `${Math.random() * 2}s`;
        cell.classList.remove("invisible");
    });
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}
   
function promptForNumber() {
    let processed_input
    do {
	let raw_input = prompt("Enter a number between 2 and 25:");
	    if (raw_input === null) { return null }
	processed_input = Number(raw_input)
    } while (!isNumeric(processed_input) || processed_input < 2 || processed_input > 25)
    return processed_input
}	  

function resizeGrid() {
    new_size = promptForNumber()
    if (new_size === null) { return }
    cells = getCells();
    cells.forEach((cell) => {
        cell.parentNode.removeChild(cell);
    });
    init(new_size)
}

function getCells() {
    return document.querySelectorAll(".grid-cell");

}
