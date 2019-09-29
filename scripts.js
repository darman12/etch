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

    // Restricting size of grid so it doesn't freeze the brwoser
    gridSize = (gridSize > 100) ? 100 
             : (gridSize < 0) ? 16
             : gridSize;

    gridArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        gridArea.appendChild(div);
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
        cell.classList.remove("invisible");
    });
}

function resizeGrid() {
    cells = getCells();

    cells.forEach((cell) => {
        cell.parentNode.removeChild(cell);
    });

    init(prompt("How big should the grid be?", 16));
}

function getCells() {
    return document.querySelectorAll(".grid-cell");

}